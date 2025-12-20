import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { BetaAnalyticsDataClient } from '@google-analytics/data';

@Injectable()
export class AnalyticsService {
  private analyticsDataClient: BetaAnalyticsDataClient | null = null;
  private propertyId: string;

  constructor(private configService: ConfigService) {
    const credentialsJson = this.configService.get<string>('GOOGLE_ANALYTICS_CREDENTIALS');
    // El property ID debe ser el número completo de la propiedad (ej: 123456789, no G-123456789)
    const propertyIdRaw = this.configService.get<string>('GOOGLE_ANALYTICS_PROPERTY_ID') || '517091107';
    // Si viene con prefijo G-, lo removemos
    const propertyId = propertyIdRaw.replace(/^G-/, '');
    
    this.propertyId = `properties/${propertyId}`;

    if (credentialsJson) {
      try {
        const credentials = JSON.parse(credentialsJson);
        this.analyticsDataClient = new BetaAnalyticsDataClient({
          credentials,
        });
        console.log('✅ Google Analytics Data API configurado correctamente');
      } catch (error) {
        console.error('❌ Error al configurar Google Analytics:', error);
      }
    } else {
      console.warn('⚠️ GOOGLE_ANALYTICS_CREDENTIALS no configurada. Los datos de analytics no estarán disponibles.');
    }
  }

  async getAnalyticsData(days: number = 7) {
    if (!this.analyticsDataClient) {
      console.warn('⚠️ Google Analytics no está configurado. Devolviendo datos vacíos.');
      // Devolver datos vacíos en lugar de lanzar error
      return {
        visitors: 0,
        pageViews: 0,
        bounceRate: 0,
        avgSessionDuration: 0,
        dailyVisitors: [],
        topPages: [],
      };
    }

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);
    const endDate = new Date();

    try {
      // Obtener visitantes únicos y vistas de página
      const [visitorsResponse, pageViewsResponse, bounceRateResponse, sessionDurationResponse, dailyVisitorsResponse, topPagesResponse] = await Promise.all([
        // Visitantes únicos
        this.analyticsDataClient.runReport({
          property: this.propertyId,
          dateRanges: [
            {
              startDate: this.formatDate(startDate),
              endDate: this.formatDate(endDate),
            },
          ],
          dimensions: [{ name: 'date' }],
          metrics: [{ name: 'activeUsers' }],
        }),
        // Vistas de página
        this.analyticsDataClient.runReport({
          property: this.propertyId,
          dateRanges: [
            {
              startDate: this.formatDate(startDate),
              endDate: this.formatDate(endDate),
            },
          ],
          metrics: [{ name: 'screenPageViews' }],
        }),
        // Tasa de rebote
        this.analyticsDataClient.runReport({
          property: this.propertyId,
          dateRanges: [
            {
              startDate: this.formatDate(startDate),
              endDate: this.formatDate(endDate),
            },
          ],
          metrics: [{ name: 'bounceRate' }],
        }),
        // Duración promedio de sesión
        this.analyticsDataClient.runReport({
          property: this.propertyId,
          dateRanges: [
            {
              startDate: this.formatDate(startDate),
              endDate: this.formatDate(endDate),
            },
          ],
          metrics: [{ name: 'averageSessionDuration' }],
        }),
        // Visitantes diarios
        this.analyticsDataClient.runReport({
          property: this.propertyId,
          dateRanges: [
            {
              startDate: this.formatDate(startDate),
              endDate: this.formatDate(endDate),
            },
          ],
          dimensions: [{ name: 'date' }],
          metrics: [{ name: 'activeUsers' }],
          orderBys: [{ dimension: { dimensionName: 'date' } }],
        }),
        // Páginas más visitadas
        this.analyticsDataClient.runReport({
          property: this.propertyId,
          dateRanges: [
            {
              startDate: this.formatDate(startDate),
              endDate: this.formatDate(endDate),
            },
          ],
          dimensions: [{ name: 'pagePath' }],
          metrics: [{ name: 'screenPageViews' }],
          orderBys: [{ metric: { metricName: 'screenPageViews' }, desc: true }],
          limit: 10,
        }),
      ]);

      // Procesar visitantes únicos
      let totalVisitors = 0;
      if (visitorsResponse[0].rows) {
        totalVisitors = parseInt(visitorsResponse[0].rows[0].metricValues?.[0]?.value || '0');
      }

      // Procesar vistas de página
      let totalPageViews = 0;
      if (pageViewsResponse[0].rows && pageViewsResponse[0].rows.length > 0) {
        totalPageViews = parseInt(pageViewsResponse[0].rows[0].metricValues?.[0]?.value || '0');
      }

      // Procesar tasa de rebote
      let bounceRate = 0;
      if (bounceRateResponse[0].rows && bounceRateResponse[0].rows.length > 0) {
        bounceRate = parseFloat(bounceRateResponse[0].rows[0].metricValues?.[0]?.value || '0') * 100;
      }

      // Procesar duración promedio de sesión (en minutos)
      let avgSessionDuration = 0;
      if (sessionDurationResponse[0].rows && sessionDurationResponse[0].rows.length > 0) {
        const seconds = parseFloat(sessionDurationResponse[0].rows[0].metricValues?.[0]?.value || '0');
        avgSessionDuration = seconds / 60; // Convertir a minutos
      }

      // Procesar visitantes diarios
      const dailyVisitors: Array<{ date: string; visitors: number }> = [];
      if (dailyVisitorsResponse[0].rows) {
        dailyVisitorsResponse[0].rows.forEach((row) => {
          const dateStr = row.dimensionValues?.[0]?.value || '';
          const visitors = parseInt(row.metricValues?.[0]?.value || '0');
          const date = new Date(
            parseInt(dateStr.substring(0, 4)),
            parseInt(dateStr.substring(4, 6)) - 1,
            parseInt(dateStr.substring(6, 8))
          );
          const dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
          dailyVisitors.push({
            date: dayNames[date.getDay()],
            visitors,
          });
        });
      }

      // Procesar páginas más visitadas
      const topPages: Array<{ page: string; views: number }> = [];
      if (topPagesResponse[0].rows) {
        topPagesResponse[0].rows.forEach((row) => {
          const page = row.dimensionValues?.[0]?.value || '/';
          const views = parseInt(row.metricValues?.[0]?.value || '0');
          topPages.push({ page, views });
        });
      }

      return {
        visitors: totalVisitors,
        pageViews: totalPageViews,
        bounceRate: Math.round(bounceRate * 10) / 10, // Redondear a 1 decimal
        avgSessionDuration: Math.round(avgSessionDuration * 10) / 10, // Redondear a 1 decimal
        dailyVisitors,
        topPages,
      };
    } catch (error: any) {
      console.error('Error al obtener datos de Google Analytics:', error);
      throw new Error(`Error al obtener datos de analytics: ${error.message}`);
    }
  }

  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}

