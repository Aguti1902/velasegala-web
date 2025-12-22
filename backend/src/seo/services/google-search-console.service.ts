import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { google } from 'googleapis';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class GoogleSearchConsoleService {
  private readonly logger = new Logger(GoogleSearchConsoleService.name);
  private searchConsole: any;

  constructor(
    private configService: ConfigService,
    private prisma: PrismaService,
  ) {
    this.initializeClient();
  }

  private initializeClient() {
    try {
      const credentialsJson = this.configService.get<string>(
        'GOOGLE_SEARCH_CONSOLE_CREDENTIALS',
      );
      
      if (!credentialsJson) {
        this.logger.warn(
          '⚠️ GOOGLE_SEARCH_CONSOLE_CREDENTIALS no configurada. GSC no estará disponible.',
        );
        return;
      }

      const credentials = JSON.parse(credentialsJson);
      const auth = new google.auth.GoogleAuth({
        credentials,
        scopes: ['https://www.googleapis.com/auth/webmasters.readonly'],
      });

      this.searchConsole = google.searchconsole({
        version: 'v1',
        auth,
      });

      this.logger.log('✅ Google Search Console API configurado correctamente');
    } catch (error) {
      this.logger.error('❌ Error al configurar Google Search Console:', error);
    }
  }

  async fetchSearchAnalytics(
    siteUrl: string,
    startDate: string,
    endDate: string,
    dimensions: string[] = ['query', 'page', 'country', 'device'],
    rowLimit: number = 25000,
  ) {
    if (!this.searchConsole) {
      throw new Error('Google Search Console no está configurado');
    }

    try {
      const response = await this.searchConsole.searchanalytics.query({
        siteUrl,
        requestBody: {
          startDate,
          endDate,
          dimensions,
          rowLimit,
          startRow: 0,
        },
      });

      return response.data.rows || [];
    } catch (error: any) {
      this.logger.error(
        `Error al obtener datos de GSC para ${siteUrl}:`,
        error.message,
      );
      throw error;
    }
  }

  async syncSearchAnalytics(siteId: string, days: number = 3) {
    const site = await this.prisma.seoSite.findUnique({
      where: { id: siteId },
    });

    if (!site || !site.gscProperty) {
      throw new Error(`Site ${siteId} no tiene GSC property configurada`);
    }

    const endDate = new Date();
    endDate.setDate(endDate.getDate() - 1); // GSC tiene 1-2 días de retraso
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const startDateStr = this.formatDate(startDate);
    const endDateStr = this.formatDate(endDate);

    this.logger.log(
      `Sincronizando GSC para ${site.domain} desde ${startDateStr} hasta ${endDateStr}`,
    );

    const rows = await this.fetchSearchAnalytics(
      site.gscProperty,
      startDateStr,
      endDateStr,
      ['query', 'page', 'country', 'device'],
    );

    let synced = 0;
    let keywordsCreated = 0;

    for (const row of rows) {
      const query = row.keys[0];
      const page = row.keys[1];
      const country = row.keys[2] || 'all';
      const device = row.keys[3] || 'all';

      // Buscar o crear keyword
      let keyword = await this.prisma.seoKeyword.findFirst({
        where: {
          siteId,
          keyword: query,
        },
      });

      if (!keyword) {
        keyword = await this.prisma.seoKeyword.create({
          data: {
            siteId,
            keyword: query,
            targetUrl: page,
            discovered: true,
            tags: [],
          },
        });
        keywordsCreated++;
      }

      // Crear o actualizar rank diario usando la fecha más reciente disponible
      // GSC agrega datos, así que usamos endDate para representar el periodo completo
      const dateStr = endDateStr;

      await this.prisma.seoKeywordRankDaily.upsert({
        where: {
          siteId_keywordId_date_country_device: {
            siteId,
            keywordId: keyword.id,
            date: new Date(dateStr),
            country,
            device,
          },
        },
        update: {
          position: row.position || null,
          clicks: row.clicks || 0,
          impressions: row.impressions || 0,
          ctr: row.ctr || null,
          pageUrl: page,
        },
        create: {
          siteId,
          keywordId: keyword.id,
          date: new Date(dateStr),
          country,
          device,
          position: row.position || null,
          clicks: row.clicks || 0,
          impressions: row.impressions || 0,
          ctr: row.ctr || null,
          pageUrl: page,
        },
      });

      synced++;
    }

    this.logger.log(
      `✅ Sincronizado: ${synced} rankings, ${keywordsCreated} keywords nuevas`,
    );

    return { synced, keywordsCreated };
  }

  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}

