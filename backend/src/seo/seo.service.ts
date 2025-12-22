import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { GoogleSearchConsoleService } from './services/google-search-console.service';
import { KeywordVolumeService } from './services/keyword-volume.service';
import { SeoAuditService } from './services/seo-audit.service';
import { SeoRecommendationService } from './services/seo-recommendation.service';
import { SeoKeywordImporterService } from './services/seo-keyword-importer.service';
import { SeoKeywordDiscoveryService } from './services/seo-keyword-discovery.service';
import { SeoCompetitorAnalysisService } from './services/seo-competitor-analysis.service';
import { SeoCompetitorSeedService } from './services/seo-competitor-seed.service';
import { SeoPdfReportService } from './services/seo-pdf-report.service';

@Injectable()
export class SeoService {
  private readonly logger = new Logger(SeoService.name);

  constructor(
    private prisma: PrismaService,
    private gscService: GoogleSearchConsoleService,
    private volumeService: KeywordVolumeService,
    private auditService: SeoAuditService,
    private recommendationService: SeoRecommendationService,
    private keywordImporter: SeoKeywordImporterService,
    private keywordDiscovery: SeoKeywordDiscoveryService,
    private competitorAnalysis: SeoCompetitorAnalysisService,
    private competitorSeed: SeoCompetitorSeedService,
    private pdfReport: SeoPdfReportService,
  ) {}

  // ===== SITES =====

  async getSites() {
    return this.prisma.seoSite.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async getSite(id: string) {
    return this.prisma.seoSite.findUnique({
      where: { id },
      include: {
        keywords: {
          take: 10,
          orderBy: { createdAt: 'desc' },
        },
      },
    });
  }

  async createSite(data: {
    domain: string;
    gscProperty?: string;
    countryDefault?: string;
  }) {
    // Usar upsert para evitar errores si el dominio ya existe
    return this.prisma.seoSite.upsert({
      where: {
        domain: data.domain,
      },
      update: {
        gscProperty: data.gscProperty,
        countryDefault: data.countryDefault || 'ES',
      },
      create: {
        domain: data.domain,
        gscProperty: data.gscProperty,
        countryDefault: data.countryDefault || 'ES',
      },
    });
  }

  async updateSite(
    id: string,
    data: Partial<{
      domain: string;
      gscProperty: string;
      countryDefault: string;
    }>,
  ) {
    return this.prisma.seoSite.update({
      where: { id },
      data,
    });
  }

  // ===== OVERVIEW / KPIs =====

  async getOverview(siteId: string, days: number = 28) {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    // Total clicks e impressions
    const stats = await this.prisma.seoKeywordRankDaily.aggregate({
      where: {
        siteId,
        date: { gte: startDate },
      },
      _sum: {
        clicks: true,
        impressions: true,
      },
      _avg: {
        position: true,
        ctr: true,
      },
    });

    // Keywords por posición (usar findMany con distinct y contar)
    const top3Keywords = await this.prisma.seoKeywordRankDaily.findMany({
      where: {
        siteId,
        date: { gte: startDate },
        position: { lte: 3 },
      },
      select: { keywordId: true },
      distinct: ['keywordId'],
    });
    const keywordsInTop3 = top3Keywords.length;

    const top10Keywords = await this.prisma.seoKeywordRankDaily.findMany({
      where: {
        siteId,
        date: { gte: startDate },
        position: { lte: 10 },
      },
      select: { keywordId: true },
      distinct: ['keywordId'],
    });
    const keywordsInTop10 = top10Keywords.length;

    const top100Keywords = await this.prisma.seoKeywordRankDaily.findMany({
      where: {
        siteId,
        date: { gte: startDate },
        position: { lte: 100 },
      },
      select: { keywordId: true },
      distinct: ['keywordId'],
    });
    const keywordsInTop100 = top100Keywords.length;

    // Issues
    const criticalIssues = await this.prisma.seoIssue.count({
      where: {
        siteId,
        severity: 'critical',
        status: 'open',
      },
    });

    const totalIssues = await this.prisma.seoIssue.count({
      where: {
        siteId,
        status: 'open',
      },
    });

    // Tendencias diarias
    const dailyTrends = await this.prisma.seoKeywordRankDaily.findMany({
      where: {
        siteId,
        date: { gte: startDate },
      },
      select: {
        date: true,
        clicks: true,
        impressions: true,
        position: true,
      },
      orderBy: { date: 'asc' },
    });

    // Agrupar por fecha
    const trendsByDate = dailyTrends.reduce((acc, item) => {
      const dateStr = item.date.toISOString().split('T')[0];
      if (!acc[dateStr]) {
        acc[dateStr] = {
          date: dateStr,
          clicks: 0,
          impressions: 0,
          positions: [] as number[],
        };
      }
      acc[dateStr].clicks += item.clicks;
      acc[dateStr].impressions += item.impressions;
      if (item.position) {
        acc[dateStr].positions.push(item.position);
      }
      return acc;
    }, {} as any);

    const trends = Object.values(trendsByDate).map((item: any) => ({
      date: item.date,
      clicks: item.clicks,
      impressions: item.impressions,
      avgPosition:
        item.positions.length > 0
          ? item.positions.reduce((a: number, b: number) => a + b, 0) /
            item.positions.length
          : null,
    }));

    // Distribución de posiciones (usar aggregate en lugar de groupBy con by: [])
    const positionStats = await this.prisma.seoKeywordRankDaily.aggregate({
      where: {
        siteId,
        date: { gte: startDate },
        position: { not: null },
      },
      _count: {
        id: true,
      },
      _avg: {
        position: true,
      },
    });

    return {
      kpis: {
        totalClicks: stats._sum.clicks || 0,
        totalImpressions: stats._sum.impressions || 0,
        avgPosition: stats._avg.position || null,
        avgCTR: stats._avg.ctr ? stats._avg.ctr * 100 : null, // Convertir a porcentaje
        keywordsTop3: keywordsInTop3,
        keywordsTop10: keywordsInTop10,
        keywordsInTop100: keywordsInTop100,
        criticalIssues,
        totalIssues,
      },
      trends,
      positionDistribution: {
        avg: positionStats._avg.position || null,
        total: positionStats._count.id || 0,
      },
    };
  }

  // ===== KEYWORDS =====

  async getKeywords(
    siteId: string,
    filters: {
      country?: string;
      device?: string;
      startDate?: Date;
      endDate?: Date;
      search?: string;
      minPosition?: number;
      maxPosition?: number;
    },
    page: number = 1,
    limit: number = 50,
  ) {
    const where: any = { siteId };

    if (filters.search) {
      where.keyword = { contains: filters.search, mode: 'insensitive' };
    }

    const keywords = await this.prisma.seoKeyword.findMany({
      where,
      include: {
        ranks: {
          where: {
            ...(filters.country && { country: filters.country }),
            ...(filters.device && { device: filters.device }),
            ...(filters.startDate && { date: { gte: filters.startDate } }),
            ...(filters.endDate && { date: { lte: filters.endDate } }),
            ...(filters.minPosition && { position: { gte: filters.minPosition } }),
            ...(filters.maxPosition && { position: { lte: filters.maxPosition } }),
          },
          orderBy: { date: 'desc' },
          take: 1, // Último ranking
        },
        volumes: {
          take: 1,
        },
      },
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { createdAt: 'desc' },
    });

    const total = await this.prisma.seoKeyword.count({ where });

    return {
      data: keywords.map((kw) => ({
        id: kw.id,
        keyword: kw.keyword,
        intent: kw.intent,
        targetUrl: kw.targetUrl,
        tags: kw.tags,
        currentPosition: kw.ranks[0]?.position || null,
        clicks: kw.ranks[0]?.clicks || 0,
        impressions: kw.ranks[0]?.impressions || 0,
        ctr: kw.ranks[0]?.ctr ? kw.ranks[0].ctr * 100 : null,
        pageUrl: kw.ranks[0]?.pageUrl || null,
        monthlyVolume: kw.volumes[0]?.volume || null,
        competition: kw.volumes[0]?.competition || null,
        cpc: kw.volumes[0]?.cpc || null,
      })),
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async getKeywordHistory(keywordId: string, days: number = 30) {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const ranks = await this.prisma.seoKeywordRankDaily.findMany({
      where: {
        keywordId,
        date: { gte: startDate },
      },
      orderBy: { date: 'asc' },
    });

    return ranks.map((r) => ({
      date: r.date,
      position: r.position,
      clicks: r.clicks,
      impressions: r.impressions,
      ctr: r.ctr ? r.ctr * 100 : null,
      pageUrl: r.pageUrl,
      country: r.country,
      device: r.device,
    }));
  }

  // ===== OPPORTUNITIES =====

  async getOpportunities(siteId: string) {
    // Quick wins: posición 4-15 con alto volumen
    const quickWins = await this.prisma.seoKeyword.findMany({
      where: { siteId },
      include: {
        ranks: {
          orderBy: { date: 'desc' },
          take: 1,
        },
        volumes: {
          take: 1,
        },
      },
    });

    const quickWinsFiltered = quickWins
      .filter((kw) => {
      const rank = kw.ranks[0];
      const volume = kw.volumes[0];
      return (
        rank &&
        rank.position !== null &&
        rank.position >= 4 &&
        rank.position <= 15 &&
        volume &&
        volume.volume &&
        volume.volume > 100
      );
      })
      .map((kw) => ({
        keyword: kw.keyword,
        position: kw.ranks[0]?.position || null,
        monthlyVolume: kw.volumes[0]?.volume || null,
        impressions: kw.ranks[0]?.impressions || 0,
        url: kw.ranks[0]?.pageUrl || null,
      }));

    // Cannibalización
    const cannibalization = await this.prisma.seoKeyword.findMany({
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

    const cannibalizationFiltered = cannibalization
      .filter((kw) => {
        const uniqueUrls = new Set(
          kw.ranks.map((r) => r.pageUrl).filter(Boolean),
        );
        return uniqueUrls.size > 1;
      })
      .map((kw) => {
        const urls = Array.from(
          new Set(kw.ranks.map((r) => r.pageUrl).filter(Boolean)),
        );
        return {
          keyword: kw.keyword,
          urls,
          urlCount: urls.length,
        };
      });

    return {
      quickWins: quickWinsFiltered,
      cannibalization: cannibalizationFiltered,
    };
  }

  // ===== TECHNICAL SEO =====

  async getTechnicalSeo(siteId: string) {
    const issues = await this.prisma.seoIssue.findMany({
      where: { siteId },
      orderBy: [
        { severity: 'asc' },
        { firstSeen: 'desc' },
      ],
    });

    const issuesByType = issues.reduce((acc, issue) => {
      if (!acc[issue.type]) {
        acc[issue.type] = [];
      }
      acc[issue.type].push(issue);
      return acc;
    }, {} as any);

    return {
      issues,
      issuesByType,
      summary: {
        critical: issues.filter((i) => i.severity === 'critical').length,
        high: issues.filter((i) => i.severity === 'high').length,
        medium: issues.filter((i) => i.severity === 'medium').length,
        low: issues.filter((i) => i.severity === 'low').length,
        total: issues.length,
      },
    };
  }

  // ===== RECOMMENDATIONS =====

  async getRecommendations(siteId: string) {
    return this.prisma.seoRecommendation.findMany({
      where: { siteId },
      orderBy: [
        { priority: 'desc' },
        { createdAt: 'desc' },
      ],
      include: {
        issue: true,
      },
    });
  }

  async updateRecommendationStatus(
    id: string,
    status: 'pending' | 'in_progress' | 'completed' | 'dismissed',
  ) {
    return this.prisma.seoRecommendation.update({
      where: { id },
      data: { status },
    });
  }

  // ===== KEYWORD IMPORT =====

  async importKeywordsFromWebsite(siteId: string) {
    const result = await this.keywordImporter.importAllKeywords(siteId);
    
    // Intentar obtener volúmenes para las keywords importadas
    const site = await this.prisma.seoSite.findUnique({
      where: { id: siteId },
    });
    
    if (site) {
      const keywordsWithoutVolume = await this.prisma.seoKeyword.findMany({
        where: {
          siteId,
          volumes: { none: {} },
        },
        take: 50,
      });

      if (keywordsWithoutVolume.length > 0) {
        try {
          await this.volumeService.syncKeywordVolumes(
            keywordsWithoutVolume.map((k) => k.id),
            site.countryDefault,
          );
        } catch (error: any) {
          this.logger.warn('Error al sincronizar volúmenes después de importar:', error.message);
        }
      }
    }
    
    return result;
  }

  // ===== KEYWORD DISCOVERY =====

  async discoverKeywords(siteId: string, minVolume: number = 100) {
    const discovered = await this.keywordDiscovery.discoverKeywords(
      siteId,
      minVolume,
    );
    const result = await this.keywordDiscovery.saveDiscoveredKeywords(
      siteId,
      discovered,
    );
    return {
      discovered: discovered.length,
      saved: result.saved,
      skipped: result.skipped,
      keywords: discovered,
    };
  }

  // ===== COMPETITOR ANALYSIS =====

  async getCompetitors(siteId: string) {
    return this.prisma.seoCompetitor.findMany({
      where: { siteId },
      orderBy: { createdAt: 'desc' },
      include: {
        _count: {
          select: { keywords: true },
        },
      },
    });
  }

  async createCompetitor(
    siteId: string,
    data: { domain: string; name?: string; url: string },
  ) {
    return this.prisma.seoCompetitor.create({
      data: {
        siteId,
        domain: data.domain,
        name: data.name,
        url: data.url,
      },
    });
  }

  async updateCompetitor(
    id: string,
    data: Partial<{ name: string; url: string; enabled: boolean }>,
  ) {
    return this.prisma.seoCompetitor.update({
      where: { id },
      data,
    });
  }

  async deleteCompetitor(id: string) {
    return this.prisma.seoCompetitor.delete({
      where: { id },
    });
  }

  async analyzeCompetitor(competitorId: string) {
    return this.competitorAnalysis.analyzeCompetitor(competitorId);
  }

  async compareWithCompetitors(siteId: string) {
    return this.competitorAnalysis.compareWithCompetitors(siteId);
  }

  async getCompetitorKeywords(competitorId: string, limit: number = 100) {
    return this.prisma.seoCompetitorKeyword.findMany({
      where: { competitorId },
      orderBy: [
        { monthlyVolume: 'desc' },
        { position: 'asc' },
        { lastSeen: 'desc' },
      ],
      take: limit,
    });
  }

  /**
   * Obtiene insights SEO detallados de un competidor
   */
  async getCompetitorInsights(competitorId: string) {
    const competitor = await this.prisma.seoCompetitor.findUnique({
      where: { id: competitorId },
    });

    if (!competitor) {
      throw new Error(`Competitor ${competitorId} not found`);
    }

    // Inyectar servicio de insights (necesitarías hacerlo en el constructor)
    // Por ahora, retornamos datos básicos
    return {
      competitorId: competitor.id,
      domain: competitor.domain,
      lastAnalyzed: competitor.lastAnalyzed,
      keywordsCount: await this.prisma.seoCompetitorKeyword.count({
        where: { competitorId },
      }),
    };
  }

  async seedCompetitors(siteId: string) {
    return this.competitorSeed.seedCompetitors(siteId);
  }

  // ===== PDF REPORTS =====

  async generateMonthlyReport(siteId: string, month?: Date): Promise<Buffer> {
    return this.pdfReport.generateMonthlyReport(siteId, month);
  }
}

