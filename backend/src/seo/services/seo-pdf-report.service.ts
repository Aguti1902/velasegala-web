import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import PDFDocument from 'pdfkit';

@Injectable()
export class SeoPdfReportService {
  private readonly logger = new Logger(SeoPdfReportService.name);

  constructor(private prisma: PrismaService) {}

  /**
   * Genera un informe PDF mensual con datos SEO
   */
  async generateMonthlyReport(siteId: string, month?: Date): Promise<Buffer> {
    try {
      this.logger.log(`📄 Generando informe PDF para sitio ${siteId}`);
      
      const reportDate = month || new Date();
      const year = reportDate.getFullYear();
      const monthNumber = reportDate.getMonth() + 1;
      const monthName = reportDate.toLocaleString('es-ES', { month: 'long' });

      // Obtener datos del sitio
      this.logger.log(`🔍 Buscando datos del sitio ${siteId}...`);
      const site = await this.prisma.seoSite.findUnique({
        where: { id: siteId },
        include: {
          keywords: {
            include: {
              ranks: {
                where: {
                  date: {
                    gte: new Date(year, monthNumber - 1, 1),
                    lt: new Date(year, monthNumber, 1),
                  },
                },
                orderBy: { date: 'desc' },
              },
              volumes: {
                take: 1,
                orderBy: { updatedAt: 'desc' },
              },
            },
            take: 50,
          },
        },
      });

      if (!site) {
        this.logger.error(`❌ Site ${siteId} no encontrado`);
        throw new Error(`Site ${siteId} not found`);
      }

      this.logger.log(`✅ Site encontrado: ${site.domain} con ${site.keywords.length} keywords`);
    } catch (error) {
      this.logger.error(`❌ Error al generar informe PDF:`, error);
      throw error;
    }

      // Obtener datos de competidores
      this.logger.log(`🔍 Buscando competidores...`);
      const competitors = await this.prisma.seoCompetitor.findMany({
        where: { siteId, enabled: true },
        include: {
          keywords: {
            take: 20,
            orderBy: { monthlyVolume: 'desc' },
          },
          _count: {
            select: { keywords: true },
          },
        },
      });
      this.logger.log(`✅ Encontrados ${competitors.length} competidores`);

      // Obtener recomendaciones
      this.logger.log(`🔍 Buscando recomendaciones...`);
      const recommendations = await this.prisma.seoRecommendation.findMany({
        where: { siteId },
        orderBy: { priority: 'desc' },
        take: 10,
      });
      this.logger.log(`✅ Encontradas ${recommendations.length} recomendaciones`);

      // Calcular KPIs
      this.logger.log(`📊 Calculando KPIs...`);
      const totalKeywords = site.keywords.length;
      const keywordsWithVolume = site.keywords.filter((k) =>
        k.volumes.some((v) => v.volume && v.volume > 0),
      ).length;

      const totalClicks = site.keywords.reduce((sum, k) => {
        const lastRank = k.ranks[0];
        return sum + (lastRank?.clicks || 0);
      }, 0);

      const totalImpressions = site.keywords.reduce((sum, k) => {
        const lastRank = k.ranks[0];
        return sum + (lastRank?.impressions || 0);
      }, 0);

      const avgPosition =
        site.keywords.reduce((sum, k) => {
          const lastRank = k.ranks[0];
          return sum + (lastRank?.position || 0);
        }, 0) / (site.keywords.filter((k) => k.ranks[0]?.position).length || 1);

      const ctr = totalImpressions > 0 ? (totalClicks / totalImpressions) * 100 : 0;

      this.logger.log(`✅ KPIs calculados: ${totalKeywords} keywords, ${totalClicks} clicks, ${totalImpressions} impresiones`);

      // Generar PDF
      this.logger.log(`📝 Generando documento PDF...`);
      const pdfBuffer = await this.createPdf({
      siteName: site.domain,
      reportPeriod: `${monthName} ${year}`,
      kpis: {
        totalKeywords,
        keywordsWithVolume,
        totalClicks,
        totalImpressions,
        avgPosition,
        ctr,
      },
      topKeywords: site.keywords.slice(0, 20).map((k) => ({
        keyword: k.keyword,
        position: k.ranks[0]?.position || null,
        clicks: k.ranks[0]?.clicks || 0,
        impressions: k.ranks[0]?.impressions || 0,
        volume: k.volumes[0]?.volume || null,
      })),
      competitors: competitors.map((c) => ({
        name: c.name || c.domain,
        keywordsCount: c._count.keywords,
        topKeywords: c.keywords.slice(0, 10).map((k) => k.keyword),
      })),
      recommendations: recommendations.map((r) => ({
        title: r.title,
        priority: r.priority,
        impact: r.impactScore,
        effort: r.effortScore,
      })),
      });

      this.logger.log(`✅ PDF generado exitosamente (${pdfBuffer.length} bytes)`);
      return pdfBuffer;
    } catch (error) {
      this.logger.error(`❌ Error al generar informe PDF:`, error);
      throw error;
    }
  }

  private async createPdf(data: {
    siteName: string;
    reportPeriod: string;
    kpis: {
      totalKeywords: number;
      keywordsWithVolume: number;
      totalClicks: number;
      totalImpressions: number;
      avgPosition: number;
      ctr: number;
    };
    topKeywords: Array<{
      keyword: string;
      position: number | null;
      clicks: number;
      impressions: number;
      volume: number | null;
    }>;
    competitors: Array<{
      name: string;
      keywordsCount: number;
      topKeywords: string[];
    }>;
    recommendations: Array<{
      title: string;
      priority: number;
      impact: number;
      effort: number;
    }>;
  }): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      try {
        const doc = new PDFDocument({
          size: 'A4',
          margins: { top: 50, bottom: 50, left: 50, right: 50 },
        });

        const chunks: Buffer[] = [];

        doc.on('data', (chunk) => chunks.push(chunk));
        doc.on('end', () => {
          this.logger.log(`✅ PDF finalizado: ${chunks.length} chunks`);
          resolve(Buffer.concat(chunks));
        });
        doc.on('error', (error) => {
          this.logger.error(`❌ Error en PDFDocument:`, error);
          reject(error);
        });

        // Header con logo y título
        doc
          .fontSize(24)
          .fillColor('#000000')
          .text('VELA SEGALÀ', 50, 50, { align: 'center' });

        doc
          .fontSize(16)
          .fillColor('#666666')
          .text('Informe SEO Mensual', 50, 80, { align: 'center' });

        doc
          .fontSize(12)
          .fillColor('#999999')
          .text(`Período: ${data.reportPeriod}`, 50, 105, { align: 'center' });

        doc
          .fontSize(10)
          .fillColor('#999999')
          .text(`Sitio: ${data.siteName}`, 50, 125, { align: 'center' });

        // Línea separadora
        doc
          .moveTo(50, 150)
          .lineTo(545, 150)
          .strokeColor('#000000')
          .lineWidth(1)
          .stroke();

        let yPos = 180;

        // Sección: KPIs
        doc.fontSize(16).fillColor('#000000').text('KPIs Principales', 50, yPos);
        yPos += 30;

        doc.fontSize(10).fillColor('#333333');

        const kpiData = [
          ['Total Keywords', data.kpis.totalKeywords.toString()],
          ['Keywords con Volumen', data.kpis.keywordsWithVolume.toString()],
          ['Total Clicks', data.kpis.totalClicks.toLocaleString()],
          ['Total Impresiones', data.kpis.totalImpressions.toLocaleString()],
          ['Posición Promedio', data.kpis.avgPosition.toFixed(1)],
          ['CTR', `${data.kpis.ctr.toFixed(2)}%`],
        ];

        kpiData.forEach(([label, value], index) => {
          const x = index % 2 === 0 ? 50 : 320;
          const y = yPos + Math.floor(index / 2) * 25;

          doc.fillColor('#000000').text(label, x, y, { width: 250 });
          doc.fillColor('#666666').text(value, x + 150, y, { width: 100 });
        });

        yPos += 80;

        // Línea separadora
        doc
          .moveTo(50, yPos)
          .lineTo(545, yPos)
          .strokeColor('#CCCCCC')
          .lineWidth(0.5)
          .stroke();

        yPos += 20;

        // Sección: Top Keywords
        doc.fontSize(16).fillColor('#000000').text('Top 20 Keywords', 50, yPos);
        yPos += 30;

        doc.fontSize(9).fillColor('#333333');

        // Header de tabla
        doc.fillColor('#000000').font('Helvetica-Bold');
        doc.text('Keyword', 50, yPos);
        doc.text('Posición', 250, yPos);
        doc.text('Clicks', 320, yPos);
        doc.text('Impresiones', 380, yPos);
        doc.text('Volumen', 470, yPos);
        doc.font('Helvetica').fillColor('#333333');
        yPos += 20;

        // Línea bajo header
        doc
          .moveTo(50, yPos - 5)
          .lineTo(545, yPos - 5)
          .strokeColor('#000000')
          .lineWidth(0.5)
          .stroke();

        // Filas de keywords
        data.topKeywords.forEach((kw, index) => {
          if (yPos > 700) {
            // Nueva página si se queda sin espacio
            doc.addPage();
            yPos = 50;
          }

          doc.text(kw.keyword.substring(0, 25), 50, yPos, { width: 190 });
          doc.text(kw.position ? kw.position.toFixed(1) : 'N/A', 250, yPos, { width: 60 });
          doc.text(kw.clicks.toLocaleString(), 320, yPos, { width: 50 });
          doc.text(kw.impressions.toLocaleString(), 380, yPos, { width: 80 });
          doc.text(kw.volume ? kw.volume.toLocaleString() : 'N/A', 470, yPos, { width: 70 });

          // Línea separadora
          if (index < data.topKeywords.length - 1) {
            doc
              .moveTo(50, yPos + 12)
              .lineTo(545, yPos + 12)
              .strokeColor('#EEEEEE')
              .lineWidth(0.5)
              .stroke();
          }

          yPos += 18;
        });

        yPos += 20;

        // Nueva página si es necesario
        if (yPos > 650) {
          doc.addPage();
          yPos = 50;
        }

        // Línea separadora
        doc
          .moveTo(50, yPos)
          .lineTo(545, yPos)
          .strokeColor('#CCCCCC')
          .lineWidth(0.5)
          .stroke();

        yPos += 20;

        // Sección: Competidores
        doc.fontSize(16).fillColor('#000000').text('Análisis de Competencia', 50, yPos);
        yPos += 30;

        doc.fontSize(10).fillColor('#333333');

        data.competitors.forEach((comp, compIndex) => {
          if (yPos > 700) {
            doc.addPage();
            yPos = 50;
          }

          doc.fillColor('#000000').font('Helvetica-Bold');
          doc.text(`${comp.name} (${comp.keywordsCount} keywords)`, 50, yPos);
          doc.font('Helvetica').fillColor('#333333');

          yPos += 20;

          doc.fontSize(9);
          comp.topKeywords.slice(0, 5).forEach((kw, kwIndex) => {
            doc.text(`• ${kw}`, 70, yPos, { width: 450 });
            yPos += 15;
          });

          yPos += 10;
        });

        yPos += 10;

        // Nueva página si es necesario
        if (yPos > 650) {
          doc.addPage();
          yPos = 50;
        }

        // Línea separadora
        doc
          .moveTo(50, yPos)
          .lineTo(545, yPos)
          .strokeColor('#CCCCCC')
          .lineWidth(0.5)
          .stroke();

        yPos += 20;

        // Sección: Recomendaciones
        doc.fontSize(16).fillColor('#000000').text('Recomendaciones Prioritarias', 50, yPos);
        yPos += 30;

        doc.fontSize(10).fillColor('#333333');

        data.recommendations.forEach((rec, index) => {
          if (yPos > 700) {
            doc.addPage();
            yPos = 50;
          }

          doc.fillColor('#000000').font('Helvetica-Bold');
          doc.text(`${index + 1}. ${rec.title}`, 50, yPos);
          doc.font('Helvetica').fillColor('#666666');

          yPos += 18;

          doc.fontSize(9);
          doc.text(
            `Prioridad: ${rec.priority}/100 | Impacto: ${rec.impact}/100 | Esfuerzo: ${rec.effort}/100`,
            70,
            yPos,
            { width: 450 },
          );

          yPos += 25;
        });

        // Footer en cada página
        const totalPages = doc.bufferedPageRange().count || 1;
        for (let i = 0; i < totalPages; i++) {
          doc.switchToPage(i);
          doc
            .fontSize(8)
            .fillColor('#999999')
            .text(
              `Clínica Dental Vela-Segalà | Informe SEO | ${data.reportPeriod} | Página ${i + 1} de ${totalPages}`,
              50,
              780,
              { align: 'center', width: 495 },
            );
        }

        doc.end();
      } catch (error) {
        this.logger.error(`❌ Error al crear PDF:`, error);
        reject(error);
      }
    });
  }
}

