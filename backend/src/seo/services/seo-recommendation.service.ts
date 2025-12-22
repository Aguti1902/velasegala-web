import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class SeoRecommendationService {
  private readonly logger = new Logger(SeoRecommendationService.name);

  constructor(private prisma: PrismaService) {}

  async generateRecommendations(siteId: string) {
    this.logger.log(`Generando recomendaciones SEO para site ${siteId}`);

    const recommendations: any[] = [];

    // 1. Quick wins: keywords en posición 4-15 con alto volumen
    const quickWins = await this.findQuickWins(siteId);
    recommendations.push(...quickWins);

    // 2. Cannibalización: múltiples URLs rankeando para la misma keyword
    const cannibalization = await this.findCannibalization(siteId);
    recommendations.push(...cannibalization);

    // 3. Problemas técnicos críticos
    const technicalIssues = await this.findTechnicalIssues(siteId);
    recommendations.push(...technicalIssues);

    // 4. CTR bajo vs posición
    const lowCTR = await this.findLowCTRKeywords(siteId);
    recommendations.push(...lowCTR);

    // Guardar recomendaciones
    for (const rec of recommendations) {
      const existing = await this.prisma.seoRecommendation.findFirst({
        where: {
          siteId,
          title: rec.title,
        },
      });

      if (existing) {
        await this.prisma.seoRecommendation.update({
          where: { id: existing.id },
          data: {
            rationale: rec.rationale,
            steps: rec.steps,
            impactScore: rec.impactScore,
            effortScore: rec.effortScore,
            priority: rec.priority,
            updatedAt: new Date(),
          },
        });
      } else {
        await this.prisma.seoRecommendation.create({
          data: {
            siteId,
            issueId: rec.issueId,
            title: rec.title,
            rationale: rec.rationale,
            steps: rec.steps,
            impactScore: rec.impactScore,
            effortScore: rec.effortScore,
            priority: rec.priority,
            status: 'pending',
          },
        });
      }
        update: {
          rationale: rec.rationale,
          steps: rec.steps,
          impactScore: rec.impactScore,
          effortScore: rec.effortScore,
          priority: rec.priority,
          updatedAt: new Date(),
        },
        create: {
          siteId,
          issueId: rec.issueId,
          title: rec.title,
          rationale: rec.rationale,
          steps: rec.steps,
          impactScore: rec.impactScore,
          effortScore: rec.effortScore,
          priority: rec.priority,
          status: 'pending',
        },
      });
    }

    this.logger.log(
      `✅ ${recommendations.length} recomendaciones generadas`,
    );

    return { recommendationsGenerated: recommendations.length };
  }

  private async findQuickWins(siteId: string): Promise<any[]> {
    const recommendations: any[] = [];

    // Buscar keywords con posición 4-15 y alto volumen
    const keywords = await this.prisma.seoKeyword.findMany({
      where: { siteId },
      include: {
        ranks: {
          where: {
            date: {
              gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // Últimos 30 días
            },
          },
          orderBy: { date: 'desc' },
          take: 1,
        },
        volumes: {
          take: 1,
        },
      },
    });

    for (const keyword of keywords) {
      const latestRank = keyword.ranks[0];
      const volume = keyword.volumes[0];

      if (
        latestRank &&
        latestRank.position >= 4 &&
        latestRank.position <= 15 &&
        volume &&
        volume.volume &&
        volume.volume > 100
      ) {
        recommendations.push({
          title: `Mejorar posición para "${keyword.keyword}"`,
          rationale: `Esta keyword tiene ${volume.volume} búsquedas mensuales y está en posición ${latestRank.position.toFixed(1)}. Con mejoras de contenido y SEO on-page, puedes subir a top 3.`,
          steps: [
            'Optimizar title y meta description para incluir la keyword',
            'Mejorar contenido de la página objetivo con información relevante',
            'Añadir internal links desde páginas relevantes',
            'Añadir schema markup si aplica',
            'Crear contenido relacionado (FAQ, guías)',
          ],
          impactScore: 80,
          effortScore: 40,
          priority: this.calculatePriority(80, 40),
        });
      }
    }

    return recommendations;
  }

  private async findCannibalization(siteId: string): Promise<any[]> {
    const recommendations: any[] = [];

    // Buscar keywords con múltiples URLs rankeando
    const keywords = await this.prisma.seoKeyword.findMany({
      where: { siteId },
      include: {
        ranks: {
          where: {
            date: {
              gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
            },
          },
        },
      },
    });

    for (const keyword of keywords) {
      const uniqueUrls = new Set(
        keyword.ranks.map((r) => r.pageUrl).filter(Boolean),
      );

      if (uniqueUrls.size > 1) {
        recommendations.push({
          title: `Cannibalización: "${keyword.keyword}" rankea en múltiples URLs`,
          rationale: `Esta keyword está rankeando en ${uniqueUrls.size} URLs diferentes, lo que divide el link equity. Debes consolidar o usar canonical.`,
          steps: [
            'Identificar la URL más relevante para esta keyword',
            'Añadir canonical tag apuntando a la URL principal',
            'Redirigir URLs secundarias si no son necesarias',
            'Consolidar contenido si es posible',
          ],
          impactScore: 70,
          effortScore: 50,
          priority: this.calculatePriority(70, 50),
        });
      }
    }

    return recommendations;
  }

  private async findTechnicalIssues(siteId: string): Promise<any[]> {
    const recommendations: any[] = [];

    const issues = await this.prisma.seoIssue.findMany({
      where: {
        siteId,
        severity: { in: ['critical', 'high'] },
        status: 'open',
      },
    });

    for (const issue of issues) {
      let steps: string[] = [];
      let impactScore = 90;
      let effortScore = 30;

      if (issue.type === 'technical') {
        if (issue.title.includes('Sitemap')) {
          steps = [
            'Verificar que el sitemap.xml existe y es accesible',
            'Añadir sitemap a Google Search Console',
            'Verificar que todas las URLs importantes están incluidas',
          ];
        } else if (issue.title.includes('Robots')) {
          steps = [
            'Crear o verificar robots.txt',
            'Asegurar que no bloquea páginas importantes',
            'Añadir sitemap location en robots.txt',
          ];
        } else if (issue.title.includes('Error HTTP')) {
          steps = [
            'Verificar el servidor y logs',
            'Corregir el error o redirigir a página válida',
            'Verificar en Google Search Console',
          ];
          impactScore = 100;
        }
      }

      recommendations.push({
        issueId: issue.id,
        title: `Arreglar: ${issue.title}`,
        rationale: issue.description,
        steps,
        impactScore,
        effortScore,
        priority: this.calculatePriority(impactScore, effortScore),
      });
    }

    return recommendations;
  }

  private async findLowCTRKeywords(siteId: string): Promise<any[]> {
    const recommendations: any[] = [];

    // Buscar keywords con CTR bajo para su posición
    const keywords = await this.prisma.seoKeyword.findMany({
      where: { siteId },
      include: {
        ranks: {
          where: {
            date: {
              gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
            },
          },
          orderBy: { date: 'desc' },
          take: 1,
        },
      },
    });

    for (const keyword of keywords) {
      const latestRank = keyword.ranks[0];
      if (!latestRank || !latestRank.position || !latestRank.ctr) continue;

      // CTR esperado por posición (aproximado)
      const expectedCTR = this.getExpectedCTR(latestRank.position);
      const actualCTR = latestRank.ctr * 100; // Convertir a porcentaje

      if (actualCTR < expectedCTR * 0.7 && latestRank.position <= 10) {
        recommendations.push({
          title: `Mejorar CTR para "${keyword.keyword}"`,
          rationale: `Esta keyword está en posición ${latestRank.position.toFixed(1)} pero tiene CTR ${actualCTR.toFixed(2)}% (esperado: ~${expectedCTR.toFixed(2)}%). Mejorar title y meta description puede aumentar clicks.`,
          steps: [
            'Reescribir title tag para ser más atractivo y específico',
            'Mejorar meta description con call-to-action',
            'Añadir números, fechas o palabras de poder si aplica',
            'Probar variantes A/B si es posible',
          ],
          impactScore: 60,
          effortScore: 30,
          priority: this.calculatePriority(60, 30),
        });
      }
    }

    return recommendations;
  }

  private getExpectedCTR(position: number): number {
    // CTR aproximado por posición (datos de estudios SEO)
    const ctrByPosition: { [key: number]: number } = {
      1: 31.7,
      2: 24.7,
      3: 18.7,
      4: 13.9,
      5: 9.9,
      6: 6.1,
      7: 4.1,
      8: 3.1,
      9: 2.4,
      10: 1.9,
    };

    if (position <= 10) {
      return ctrByPosition[Math.round(position)] || 1.5;
    }
    return 1.0;
  }

  private calculatePriority(impact: number, effort: number): number {
    // Prioridad = impacto * (1 - esfuerzo/100)
    // Más impacto y menos esfuerzo = mayor prioridad
    return Math.round(impact * (1 - effort / 100));
  }
}

