import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PrismaService } from '../prisma/prisma.service';
import { GoogleSearchConsoleService } from './services/google-search-console.service';
import { KeywordVolumeService } from './services/keyword-volume.service';
import { SeoAuditService } from './services/seo-audit.service';
import { SeoRecommendationService } from './services/seo-recommendation.service';
import { SeoService } from './seo.service';

@Injectable()
export class SeoCronService {
  private readonly logger = new Logger(SeoCronService.name);
  private isRunning = false;

  constructor(
    private prisma: PrismaService,
    private gscService: GoogleSearchConsoleService,
    private volumeService: KeywordVolumeService,
    private auditService: SeoAuditService,
    private recommendationService: SeoRecommendationService,
    private seoService: SeoService,
  ) {}

  // Ejecutar diariamente a las 2 AM UTC
  @Cron('0 2 * * *')
  async handleDailySync() {
    if (this.isRunning) {
      this.logger.warn('Job diario ya está en ejecución, saltando...');
      return;
    }

    this.isRunning = true;
    this.logger.log('🚀 Iniciando sincronización diaria de SEO...');

    try {
      const sites = await this.prisma.seoSite.findMany();

      for (const site of sites) {
        try {
          this.logger.log(`Procesando sitio: ${site.domain}`);

          // 1. Sincronizar datos de Google Search Console (últimos 3 días)
          if (site.gscProperty) {
            try {
              await this.gscService.syncSearchAnalytics(site.id, 3);
            } catch (error: any) {
              this.logger.error(
                `Error al sincronizar GSC para ${site.domain}:`,
                error.message,
              );
            }
          }

          // 2. Actualizar volúmenes de keywords (solo keywords nuevas o sin volumen)
          const keywordsWithoutVolume = await this.prisma.seoKeyword.findMany({
            where: {
              siteId: site.id,
              volumes: { none: {} },
            },
            take: 50, // Limitar para no exceder rate limits
          });

          if (keywordsWithoutVolume.length > 0) {
            try {
              await this.volumeService.syncKeywordVolumes(
                keywordsWithoutVolume.map((k) => k.id),
                site.countryDefault,
              );
            } catch (error: any) {
              this.logger.error(
                `Error al sincronizar volúmenes para ${site.domain}:`,
                error.message,
              );
            }
          }

          // 3. Auditoría técnica (una vez por semana)
          const today = new Date();
          const lastAudit = site.updatedAt;
          const daysSinceAudit =
            (today.getTime() - lastAudit.getTime()) / (1000 * 60 * 60 * 24);

          if (daysSinceAudit >= 7) {
            try {
              await this.auditService.auditSite(site.id, `https://${site.domain}`);
            } catch (error: any) {
              this.logger.error(
                `Error en auditoría para ${site.domain}:`,
                error.message,
              );
            }
          }

          // 4. Generar recomendaciones (una vez por día)
          try {
            await this.recommendationService.generateRecommendations(site.id);
          } catch (error: any) {
            this.logger.error(
              `Error al generar recomendaciones para ${site.domain}:`,
              error.message,
            );
          }
        } catch (error: any) {
          this.logger.error(
            `Error procesando sitio ${site.domain}:`,
            error.message,
          );
        }
      }

      this.logger.log('✅ Sincronización diaria completada');
    } catch (error: any) {
      this.logger.error('❌ Error en sincronización diaria:', error);
    } finally {
      this.isRunning = false;
    }
  }

  // Método manual para ejecutar sincronización
  async runManualSync(siteId?: string) {
    if (this.isRunning) {
      throw new Error('Sincronización ya en ejecución');
    }

    this.isRunning = true;

    try {
      const sites = siteId
        ? [await this.prisma.seoSite.findUnique({ where: { id: siteId } })]
        : await this.prisma.seoSite.findMany();

      const results: any[] = [];

      for (const site of sites.filter(Boolean)) {
        if (!site) continue;

        const result: any = { siteId: site.id, domain: site.domain };

        // GSC Sync
        if (site.gscProperty) {
          try {
            const gscResult = await this.gscService.syncSearchAnalytics(
              site.id,
              3,
            );
            result.gsc = gscResult;
          } catch (error: any) {
            result.gsc = { error: error.message };
          }
        }

        // Volumes
        const keywords = await this.prisma.seoKeyword.findMany({
          where: { siteId: site.id },
          take: 50,
        });

        if (keywords.length > 0) {
          try {
            const volumeResult = await this.volumeService.syncKeywordVolumes(
              keywords.map((k) => k.id),
              site.countryDefault,
            );
            result.volumes = volumeResult;
          } catch (error: any) {
            result.volumes = { error: error.message };
          }
        }

        // Audit
        try {
          const auditResult = await this.auditService.auditSite(
            site.id,
            `https://${site.domain}`,
          );
          result.audit = auditResult;
        } catch (error: any) {
          result.audit = { error: error.message };
        }

        // Recommendations
        try {
          const recResult =
            await this.recommendationService.generateRecommendations(site.id);
          result.recommendations = recResult;
        } catch (error: any) {
          result.recommendations = { error: error.message };
        }

        results.push(result);
      }

      return results;
    } finally {
      this.isRunning = false;
    }
  }

  /**
   * Cron job mensual para descubrir nuevas keywords
   * Se ejecuta el día 1 de cada mes a las 3:00 AM UTC
   */
  @Cron('0 3 1 * *')
  async handleMonthlyKeywordDiscovery() {
    this.logger.log('🔍 Iniciando descubrimiento mensual de keywords...');

    const sites = await this.prisma.seoSite.findMany();

    for (const site of sites) {
      try {
        this.logger.log(`Descubriendo keywords para ${site.domain}...`);
        const result = await this.seoService.discoverKeywords(site.id, 100);
        this.logger.log(
          `✅ Descubiertas ${result.discovered} keywords, guardadas ${result.saved} para ${site.domain}`,
        );
      } catch (error: any) {
        this.logger.error(
          `Error al descubrir keywords para sitio ${site.id}:`,
          error.message,
        );
      }
    }

    this.logger.log('✅ Descubrimiento mensual de keywords completado');
  }
}

