import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class KeywordVolumeService {
  private readonly logger = new Logger(KeywordVolumeService.name);
  private volumeProvider: string;

  constructor(
    private configService: ConfigService,
    private prisma: PrismaService,
  ) {
    this.volumeProvider =
      this.configService.get<string>('SEO_VOLUME_PROVIDER') || 'none';
  }

  async getKeywordVolume(
    keyword: string,
    country: string = 'ES',
  ): Promise<{
    volume: number | null;
    competition: string | null;
    cpc: number | null;
  }> {
    switch (this.volumeProvider) {
      case 'dataforseo':
        return this.getFromDataForSEO(keyword, country);
      case 'google_ads':
        // Google Ads Keyword Planner requiere autenticación compleja
        // Por ahora retornamos null, se puede implementar después
        this.logger.warn('Google Ads Keyword Planner no implementado aún');
        return { volume: null, competition: null, cpc: null };
      default:
        // Sin proveedor configurado, retornar null
        return { volume: null, competition: null, cpc: null };
    }
  }

  private async getFromDataForSEO(
    keyword: string,
    country: string,
  ): Promise<{
    volume: number | null;
    competition: string | null;
    cpc: number | null;
  }> {
    const apiKey = this.configService.get<string>('DATAFORSEO_API_KEY');
    const apiSecret = this.configService.get<string>('DATAFORSEO_API_SECRET');

    if (!apiKey || !apiSecret) {
      this.logger.warn('DataForSEO credentials no configuradas');
      return { volume: null, competition: null, cpc: null };
    }

    try {
      // DataForSEO API endpoint
      const response = await axios.post(
        'https://api.dataforseo.com/v3/keywords_data/google_ads/keywords/live',
        [
          {
            keyword: keyword,
            location_code: this.getLocationCode(country),
            language_code: 'es',
          },
        ],
        {
          auth: {
            username: apiKey,
            password: apiSecret,
          },
        },
      );

      const data = response.data?.tasks?.[0]?.result?.[0];
      if (data) {
        return {
          volume: data.search_volume || null,
          competition: this.mapCompetition(data.competition),
          cpc: data.cpc || null,
        };
      }

      return { volume: null, competition: null, cpc: null };
    } catch (error: any) {
      this.logger.error(
        `Error al obtener volumen de keyword "${keyword}":`,
        error.message,
      );
      return { volume: null, competition: null, cpc: null };
    }
  }

  private getLocationCode(country: string): number {
    // Códigos de ubicación de DataForSEO
    const codes: { [key: string]: number } = {
      ES: 2826, // Spain
      US: 2840, // United States
      GB: 2826, // United Kingdom
      FR: 2250, // France
      DE: 2276, // Germany
      IT: 2380, // Italy
    };
    return codes[country] || 2826;
  }

  private mapCompetition(value: number | null): string | null {
    if (value === null) return null;
    if (value < 0.33) return 'low';
    if (value < 0.66) return 'medium';
    return 'high';
  }

  async syncKeywordVolumes(keywordIds: string[], country: string = 'ES') {
    let synced = 0;
    let errors = 0;

    for (const keywordId of keywordIds) {
      const keyword = await this.prisma.seoKeyword.findUnique({
        where: { id: keywordId },
      });

      if (!keyword) continue;

      try {
        const volumeData = await this.getKeywordVolume(keyword.keyword, country);

        if (volumeData.volume !== null) {
          await this.prisma.seoKeywordVolumeMonthly.upsert({
            where: {
              keywordId_provider_country: {
                keywordId,
                provider: this.volumeProvider || 'manual',
                country,
              },
            },
            update: {
              volume: volumeData.volume,
              competition: volumeData.competition,
              cpc: volumeData.cpc,
              updatedAt: new Date(),
            },
            create: {
              keywordId,
              provider: this.volumeProvider || 'manual',
              country,
              volume: volumeData.volume,
              competition: volumeData.competition,
              cpc: volumeData.cpc,
            },
          });
          synced++;
        }
      } catch (error) {
        this.logger.error(
          `Error al sincronizar volumen para keyword ${keywordId}:`,
          error,
        );
        errors++;
      }
    }

    this.logger.log(
      `✅ Volúmenes sincronizados: ${synced} exitosos, ${errors} errores`,
    );

    return { synced, errors };
  }
}

