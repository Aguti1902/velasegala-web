import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

export interface SerpApiKeywordData {
  keyword: string;
  position: number;
  url: string;
  title: string;
  snippet: string;
}

export interface SerpApiResult {
  organic_results: Array<{
    position: number;
    title: string;
    link: string;
    snippet: string;
    displayed_link: string;
  }>;
  search_metadata: {
    total_results: number;
  };
}

@Injectable()
export class SerpApiService {
  private readonly logger = new Logger(SerpApiService.name);
  private readonly apiKey: string | null;

  constructor(private configService: ConfigService) {
    this.apiKey = this.configService.get<string>('SERPAPI_API_KEY') || null;
    
    if (!this.apiKey) {
      this.logger.warn('SERPAPI_API_KEY no configurada. El análisis de competidores estará limitado.');
    }
  }

  /**
   * Busca keywords en Google para un dominio específico
   * Retorna las keywords y posiciones donde aparece ese dominio
   */
  async searchKeywordsForDomain(
    keyword: string,
    domain?: string,
    location: string = 'Viladecans, Barcelona, Spain',
    language: string = 'es',
  ): Promise<SerpApiKeywordData[]> {
    if (!this.apiKey) {
      throw new Error('SERPAPI_API_KEY no configurada. Configúrala en Railway para usar esta funcionalidad.');
    }

    try {
      // Codificar la keyword correctamente para URL
      const encodedKeyword = encodeURIComponent(keyword);
      
      this.logger.log(`🔍 Buscando en SerpAPI: "${keyword}"`);
      
      const response = await axios.get<SerpApiResult>(
        'https://serpapi.com/search',
        {
          params: {
            engine: 'google',
            q: keyword,
            api_key: this.apiKey,
            location: location || 'Viladecans, Barcelona, Spain',
            hl: language || 'es',
            gl: 'es',
            num: 100,
          },
          paramsSerializer: (params) => {
            // Serializar parámetros manualmente para asegurar codificación correcta
            return Object.keys(params)
              .map((key) => {
                const value = params[key];
                if (value === null || value === undefined) return '';
                return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
              })
              .filter(Boolean)
              .join('&');
          },
          timeout: 30000,
          validateStatus: (status) => status < 500, // No lanzar error para 4xx, manejarlo manualmente
        },
      );
      
      // Verificar si hay error en la respuesta
      if (response.status === 400) {
        const errorMessage = response.data?.error || 'Bad Request';
        this.logger.error(`❌ SerpAPI 400 para "${keyword}": ${errorMessage}`);
        throw new Error(`SerpAPI Bad Request: ${errorMessage}`);
      }

      const results: SerpApiKeywordData[] = [];

      if (response.data.organic_results) {
        for (const result of response.data.organic_results) {
          // Si se especifica un dominio, solo retornar resultados de ese dominio
          if (domain) {
            try {
              const resultUrl = new URL(result.link);
              const resultDomain = resultUrl.hostname.toLowerCase().replace(/^www\./, '');
              const searchDomain = domain.toLowerCase().replace(/^www\./, '').replace(/^https?:\/\//, '').replace(/\/$/, '');
              
              // Comparación más flexible: dominio exacto o subdominio
              const domainMatches = 
                resultDomain === searchDomain ||
                resultDomain.endsWith('.' + searchDomain) ||
                searchDomain.endsWith('.' + resultDomain) ||
                resultDomain.includes(searchDomain) ||
                searchDomain.includes(resultDomain);
              
              if (domainMatches) {
                this.logger.log(`✅ Match encontrado: ${resultDomain} para dominio ${searchDomain} en keyword "${keyword}" posición ${result.position}`);
                results.push({
                  keyword,
                  position: result.position,
                  url: result.link,
                  title: result.title,
                  snippet: result.snippet,
                });
              }
            } catch (e) {
              // Si la URL no es válida, continuar
              this.logger.warn(`Error parseando URL ${result.link}:`, e);
              continue;
            }
          } else {
            // Sin dominio, retornar todos los resultados
            results.push({
              keyword,
              position: result.position,
              url: result.link,
              title: result.title,
              snippet: result.snippet,
            });
          }
        }
      }

      return results;
    } catch (error: any) {
      // Log detallado del error
      if (error.response) {
        const status = error.response.status;
        const errorData = error.response.data;
        this.logger.error(`❌ SerpAPI Error ${status} para keyword "${keyword}":`, JSON.stringify(errorData));
        
        if (status === 400) {
          const errorMsg = errorData?.error || errorData?.message || 'Bad Request - Verifica los parámetros';
          this.logger.error(`Detalles del error 400:`, errorMsg);
          throw new Error(`SerpAPI Bad Request: ${errorMsg}. Verifica que la API key sea válida y que los parámetros sean correctos.`);
        }
        if (status === 401) {
          throw new Error('API Key de SerpAPI inválida. Verifica SERPAPI_API_KEY en Railway.');
        }
        if (status === 429) {
          throw new Error('Límite de requests de SerpAPI excedido. Intenta más tarde.');
        }
      } else {
        this.logger.error(`Error en SerpAPI para keyword "${keyword}":`, error.message);
      }
      throw error;
    }
  }

  /**
   * Descubre keywords donde un dominio está posicionado
   * Busca en múltiples keywords relacionadas con el nicho
   */
  async discoverDomainKeywords(
    domain: string,
    baseKeywords: string[],
    location: string = 'Viladecans, Barcelona, Spain',
  ): Promise<Array<{
    keyword: string;
    position: number;
    url: string;
    title: string;
  }>> {
    if (!this.apiKey) {
      throw new Error('SERPAPI_API_KEY no configurada.');
    }

    const allResults: Array<{
      keyword: string;
      position: number;
      url: string;
      title: string;
    }> = [];

    const cleanDomain = domain.replace('www.', '').replace(/^https?:\/\//, '').replace(/\/$/, '');

    this.logger.log(`🔍 Buscando keywords para dominio "${cleanDomain}" con ${baseKeywords.length} keywords base`);
    
    for (let i = 0; i < baseKeywords.length; i++) {
      const baseKeyword = baseKeywords[i];
      try {
        this.logger.log(`Buscando "${baseKeyword}" (${i + 1}/${baseKeywords.length})...`);
        const results = await this.searchKeywordsForDomain(baseKeyword, cleanDomain, location);
        
        if (results.length > 0) {
          this.logger.log(`✅ Encontradas ${results.length} posiciones para "${baseKeyword}"`);
        }
        
        for (const result of results) {
          allResults.push({
            keyword: baseKeyword,
            position: result.position,
            url: result.url,
            title: result.title,
          });
        }

        // Rate limiting: esperar 1 segundo entre requests para evitar límites
        await this.sleep(1000);
      } catch (error: any) {
        this.logger.warn(`Error descubriendo keywords para "${baseKeyword}":`, error.message);
        // Continuar con la siguiente keyword
        continue;
      }
    }
    
    this.logger.log(`📊 Total keywords encontradas para ${cleanDomain}: ${allResults.length}`);

    // Eliminar duplicados (misma keyword + URL)
    const uniqueResults = Array.from(
      new Map(
        allResults.map((r) => [`${r.keyword}|${r.url}`, r]),
      ).values(),
    );

    return uniqueResults;
  }

  /**
   * Obtiene el volumen de búsqueda estimado para una keyword
   * Nota: SerpAPI no proporciona volumen directamente, esto sería una estimación
   * basada en otros datos. En producción, usarías Google Keyword Planner o DataForSEO.
   */
  async getKeywordVolume(keyword: string): Promise<number | null> {
    // SerpAPI no tiene endpoint directo de volumen
    // Retornar null y usar otro servicio para volumen
    return null;
  }

  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

