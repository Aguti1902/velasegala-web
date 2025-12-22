import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import * as cheerio from 'cheerio';
import { PrismaService } from '../../prisma/prisma.service';
import { KeywordVolumeService } from './keyword-volume.service';
import { SerpApiService } from './serpapi.service';
import { GoogleSearchConsoleService } from './google-search-console.service';
import { SeoCompetitorInsightsService } from './seo-competitor-insights.service';

@Injectable()
export class SeoCompetitorAnalysisService {
  private readonly logger = new Logger(SeoCompetitorAnalysisService.name);

  constructor(
    private prisma: PrismaService,
    private volumeService: KeywordVolumeService,
    private serpApi: SerpApiService,
    private gscService: GoogleSearchConsoleService,
    private insightsService: SeoCompetitorInsightsService,
  ) {}

  /**
   * Analiza un competidor: extrae keywords REALES de Google usando SerpAPI
   */
  async analyzeCompetitor(competitorId: string) {
    const competitor = await this.prisma.seoCompetitor.findUnique({
      where: { id: competitorId },
    });

    if (!competitor) {
      throw new Error(`Competitor ${competitorId} not found`);
    }

    this.logger.log(`🔍 Iniciando análisis REAL de competidor: ${competitor.domain}`);

    try {
      const cleanDomain = competitor.domain.replace('www.', '').replace(/^https?:\/\//, '').replace(/\/$/, '');
      
      // Keywords base para buscar en Google
      const baseKeywords = this.generateSearchKeywords(cleanDomain);

      // 1. Descubrir keywords REALES donde el competidor está posicionado usando SerpAPI
      let discoveredKeywords: Array<{
        keyword: string;
        position: number;
        url: string;
        title: string;
      }> = [];

      try {
        this.logger.log(`🔍 Buscando keywords reales de ${competitor.domain} en Google usando SerpAPI...`);
        this.logger.log(`📋 Keywords base a buscar: ${baseKeywords.length}`);
        
        discoveredKeywords = await this.serpApi.discoverDomainKeywords(
          cleanDomain,
          baseKeywords,
          'Viladecans, Barcelona, Spain',
        );
        
        if (discoveredKeywords.length > 0) {
          this.logger.log(`✅ Encontradas ${discoveredKeywords.length} keywords reales para ${competitor.domain}`);
        } else {
          this.logger.warn(`⚠️ No se encontraron keywords en Google para ${competitor.domain}`);
          this.logger.warn(`💡 Esto puede ser normal si el dominio no está bien posicionado aún`);
          this.logger.warn(`💡 Intentando método alternativo (scraping) para obtener keywords básicas...`);
          // Si SerpAPI no encuentra nada, intentar scraping como fallback
          discoveredKeywords = await this.discoverKeywordsViaScraping(competitor.url);
        }
      } catch (error: any) {
        this.logger.error(`❌ Error usando SerpAPI:`, error.message);
        if (error.message.includes('SERPAPI_API_KEY') || error.message.includes('no configurada')) {
          this.logger.error(`⚠️ ${error.message}. Usando método de análisis alternativo (scraping).`);
          // Fallback a scraping si no hay API key
          discoveredKeywords = await this.discoverKeywordsViaScraping(competitor.url);
        } else {
          this.logger.warn(`⚠️ Error con SerpAPI, intentando scraping como fallback...`);
          try {
            discoveredKeywords = await this.discoverKeywordsViaScraping(competitor.url);
          } catch (scrapeError: any) {
            this.logger.error(`❌ Error en scraping también:`, scrapeError.message);
            throw error; // Lanzar el error original
          }
        }
      }

      // 2. Guardar keywords encontradas con datos reales
      let saved = 0;
      let skipped = 0;

      for (const kwData of discoveredKeywords) {
        try {
          // Obtener volumen si está disponible
          let volume: number | null = null;
          try {
            const volumeData = await this.volumeService.getKeywordVolume(
              kwData.keyword,
              'ES',
            );
            volume = volumeData.volume;
            await this.sleep(200); // Rate limiting
          } catch (error) {
            // Continuar sin volumen si falla
          }

          // Guardar o actualizar keyword
          await this.prisma.seoCompetitorKeyword.upsert({
            where: {
              competitorId_keyword: {
                competitorId: competitor.id,
                keyword: kwData.keyword,
              },
            },
            update: {
              position: kwData.position,
              targetUrl: kwData.url,
              lastSeen: new Date(),
              monthlyVolume: volume || undefined,
              intent: this.detectIntent(kwData.keyword),
            },
            create: {
              competitorId: competitor.id,
              keyword: kwData.keyword,
              position: kwData.position,
              targetUrl: kwData.url,
              monthlyVolume: volume,
              intent: this.detectIntent(kwData.keyword),
            },
          });

          // Guardar ranking histórico
          await this.prisma.seoCompetitorRanking.upsert({
            where: {
              competitorId_keyword_date: {
                competitorId: competitor.id,
                keyword: kwData.keyword,
                date: new Date(),
              },
            },
            update: {
              position: kwData.position,
              url: kwData.url,
            },
            create: {
              competitorId: competitor.id,
              keyword: kwData.keyword,
              date: new Date(),
              position: kwData.position,
              url: kwData.url,
            },
          });

          saved++;
        } catch (error: any) {
          this.logger.warn(`Error guardando keyword "${kwData.keyword}":`, error.message);
          skipped++;
        }
      }

      // 3. Analizar buenas prácticas SEO del competidor (análisis detallado)
      await this.analyzeCompetitorBestPractices(competitor.id, competitor.url);

      // 4. Actualizar fecha de último análisis
      await this.prisma.seoCompetitor.update({
        where: { id: competitorId },
        data: { lastAnalyzed: new Date() },
      });

      this.logger.log(
        `✅ Análisis completado para ${competitor.domain}: ${saved} keywords guardadas, ${skipped} omitidas`,
      );

      return {
        competitorId: competitor.id,
        domain: competitor.domain,
        keywordsFound: discoveredKeywords.length,
        keywordsSaved: saved,
        keywordsSkipped: skipped,
        method: discoveredKeywords.length > 0 ? 'serpapi' : 'scraping',
      };
    } catch (error: any) {
      this.logger.error(
        `Error analizando competidor ${competitor.domain}:`,
        error.message,
      );
      throw error;
    }
  }

  /**
   * Genera keywords de búsqueda relevantes para el nicho dental
   */
  private generateSearchKeywords(domain: string): string[] {
    const locationKeywords = ['viladecans', 'barcelona'];
    const serviceKeywords = [
      'dentista viladecans',
      'clínica dental viladecans',
      'implantes dentales viladecans',
      'ortodoncia viladecans',
      'estética dental viladecans',
      'blanqueamiento dental viladecans',
      'endodoncia viladecans',
      'periodoncia viladecans',
      'cirugía oral viladecans',
      'odontopediatría viladecans',
      'bruxismo viladecans',
      'prótesis dental viladecans',
      'dentista barcelona',
      'clínica dental barcelona',
      'implantes dentales barcelona',
      'ortodoncia invisible viladecans',
      'invisalign viladecans',
      'carillas dentales viladecans',
      'dentista cerca de viladecans',
      'mejor dentista viladecans',
    ];

    // Añadir variaciones con el nombre del dominio si es reconocible
    const domainName = domain.split('.')[0].toLowerCase();
    if (domainName && domainName.length > 3) {
      serviceKeywords.push(`${domainName} viladecans`);
      serviceKeywords.push(`clínica ${domainName} viladecans`);
    }

    return serviceKeywords;
  }

  /**
   * Método alternativo: descubrir keywords via scraping (sin API)
   * Este método es menos preciso pero puede encontrar keywords básicas
   */
  private async discoverKeywordsViaScraping(url: string): Promise<Array<{
    keyword: string;
    position: number;
    url: string;
    title: string;
  }>> {
    this.logger.warn('⚠️ Usando método de scraping (menos preciso que SerpAPI)');
    this.logger.warn('💡 Configura SERPAPI_API_KEY para obtener posiciones reales de Google');
    
    try {
      // Analizar la página y extraer keywords potenciales
      const pageData = await this.analyzePage(url);
      
      this.logger.log(`📄 Analizada página ${url}: ${pageData.keywords.length} keywords encontradas`);
      
      // Filtrar keywords relevantes (mínimo 3 caracteres, máximo 100)
      const relevantKeywords = pageData.keywords.filter(
        kw => kw.length >= 3 && kw.length <= 100 && !kw.includes('http')
      ).slice(0, 50); // Limitar a 50 keywords más relevantes
      
      // Convertir a formato esperado (sin posiciones reales, todas en posición "desconocida")
      return relevantKeywords.map((kw) => ({
        keyword: kw,
        position: 999, // Posición desconocida (999 = no rankeando o desconocido)
        url: url,
        title: pageData.title || '',
      }));
    } catch (error: any) {
      this.logger.error(`Error en scraping para ${url}:`, error.message);
      return [];
    }
  }

  /**
   * Analiza una página y extrae keywords, meta tags, etc.
   */
  private async analyzePage(url: string): Promise<{
    keywords: string[];
    title: string | null;
    description: string | null;
    h1s: string[];
    h2s: string[];
  }> {
    try {
      const response = await axios.get(url, {
        timeout: 10000,
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        },
        validateStatus: (status) => status < 500,
      });

      if (response.status >= 400) {
        return { keywords: [], title: null, description: null, h1s: [], h2s: [] };
      }

      const $ = cheerio.load(response.data);

      // Extraer keywords de meta tags
      const keywords: string[] = [];
      const metaKeywords = $('meta[name="keywords"]').attr('content');
      if (metaKeywords) {
        keywords.push(
          ...metaKeywords
            .split(',')
            .map((k) => k.trim())
            .filter(Boolean),
        );
      }

      // Extraer keywords de título
      const title = $('title').text().trim();
      if (title) {
        keywords.push(...this.extractKeywordsFromText(title));
      }

      // Extraer keywords de headings
      const h1s: string[] = [];
      $('h1').each((_, el) => {
        const text = $(el).text().trim();
        if (text) {
          h1s.push(text);
          keywords.push(...this.extractKeywordsFromText(text));
        }
      });

      const h2s: string[] = [];
      $('h2').each((_, el) => {
        const text = $(el).text().trim();
        if (text) {
          h2s.push(text);
          keywords.push(...this.extractKeywordsFromText(text));
        }
      });

      // Extraer keywords de meta description
      const description = $('meta[name="description"]').attr('content');
      if (description) {
        keywords.push(...this.extractKeywordsFromText(description));
      }

      // Limpiar y filtrar keywords
      const cleanKeywords = Array.from(
        new Set(
          keywords
            .map((k) => k.toLowerCase().trim())
            .filter((k) => k.length > 3 && k.length < 100)
            .filter((k) => !this.isStopWord(k)),
        ),
      );

      return {
        keywords: cleanKeywords,
        title,
        description: description || null,
        h1s,
        h2s,
      };
    } catch (error: any) {
      this.logger.warn(`Error analizando página ${url}:`, error.message);
      return { keywords: [], title: null, description: null, h1s: [], h2s: [] };
    }
  }

  /**
   * Descubre páginas principales de un sitio
   */
  private async discoverMainPages(baseUrl: string): Promise<string[]> {
    const pages: string[] = [];
    const commonPaths = [
      '/tratamientos',
      '/tratamiento',
      '/servicios',
      '/servicio',
      '/implantes',
      '/ortodoncia',
      '/estetica',
      '/estetica-dental',
      '/blanqueamiento',
      '/nosotros',
      '/equipo',
      '/contacto',
      '/blog',
      '/sobre-nosotros',
      '/clinica',
    ];

    for (const path of commonPaths) {
      pages.push(`${baseUrl}${path}`);
    }

    return pages;
  }

  /**
   * Extrae keywords de un texto
   */
  private extractKeywordsFromText(text: string): string[] {
    // Extraer frases clave (2-4 palabras)
    const words = text.toLowerCase().split(/\s+/);
    const keywords: string[] = [];

    // Frases de 2 palabras
    for (let i = 0; i < words.length - 1; i++) {
      const phrase = `${words[i]} ${words[i + 1]}`;
      if (phrase.length > 4 && phrase.length < 50) {
        keywords.push(phrase);
      }
    }

    // Frases de 3 palabras (más específicas)
    for (let i = 0; i < words.length - 2; i++) {
      const phrase = `${words[i]} ${words[i + 1]} ${words[i + 2]}`;
      if (phrase.length > 6 && phrase.length < 60) {
        keywords.push(phrase);
      }
    }

    return keywords;
  }

  /**
   * Detecta si una palabra es stop word (palabras comunes sin valor SEO)
   */
  private isStopWord(word: string): boolean {
    const stopWords = [
      'el',
      'la',
      'los',
      'las',
      'un',
      'una',
      'de',
      'del',
      'en',
      'con',
      'por',
      'para',
      'que',
      'es',
      'son',
      'está',
      'están',
      'y',
      'o',
      'a',
      'al',
      'se',
      'te',
      'le',
      'nos',
      'les',
      'su',
      'sus',
      'tu',
      'tus',
      'nuestro',
      'nuestra',
      'este',
      'esta',
      'estos',
      'estas',
      'ese',
      'esa',
      'esos',
      'esas',
    ];
    return stopWords.includes(word);
  }

  /**
   * Detecta la intención de búsqueda
   */
  private detectIntent(keyword: string): string {
    const keywordLower = keyword.toLowerCase();

    if (
      keywordLower.includes('precio') ||
      keywordLower.includes('coste') ||
      keywordLower.includes('barato') ||
      keywordLower.includes('cita') ||
      keywordLower.includes('pedir')
    ) {
      return 'transactional';
    }

    if (
      keywordLower.includes('dirección') ||
      keywordLower.includes('teléfono') ||
      keywordLower.includes('contacto') ||
      keywordLower.includes('horarios') ||
      keywordLower.includes('dónde')
    ) {
      return 'navigational';
    }

    return 'informational';
  }

  /**
   * Compara nuestro sitio con competidores
   */
  async compareWithCompetitors(siteId: string) {
    const site = await this.prisma.seoSite.findUnique({
      where: { id: siteId },
      include: {
        keywords: {
          include: {
            rankHistory: {
              orderBy: { date: 'desc' },
              take: 1,
              where: {
                country: 'ES', // Filtrar por país por defecto
                device: 'all',
              },
            },
            volumeHistory: {
              where: { country: 'ES' },
              orderBy: { updatedAt: 'desc' },
              take: 1,
            },
          },
        },
      },
    });

    if (!site) {
      throw new Error(`Site ${siteId} not found`);
    }

    const competitors = await this.prisma.seoCompetitor.findMany({
      where: { siteId, enabled: true },
      include: {
        keywords: true,
        rankings: {
          orderBy: { date: 'desc' },
          take: 1000, // Últimas rankings
        },
      },
    });

    // Mapa de nuestras keywords con sus datos
    const ourKeywordsMap = new Map<
      string,
      {
        keyword: string;
        position: number | null;
        volume: number | null;
        clicks: number;
        impressions: number;
      }
    >();

    for (const kw of site.keywords) {
      const latestRank = kw.rankHistory?.[0];
      const latestVolume = kw.volumeHistory?.[0];
      ourKeywordsMap.set(kw.keyword.toLowerCase(), {
        keyword: kw.keyword,
        position: latestRank?.position || null,
        volume: latestVolume?.volume || null,
        clicks: latestRank?.clicks || 0,
        impressions: latestRank?.impressions || 0,
      });
    }

    // Mapa de keywords de competidores con sus datos
    const competitorKeywordsMap = new Map<
      string,
      Array<{
        keyword: string;
        competitor: string;
        competitorName: string;
        position: number | null;
        volume: number | null;
        url: string | null;
      }>
    >();

    for (const competitor of competitors) {
      for (const compKw of competitor.keywords) {
        const key = compKw.keyword.toLowerCase();
        if (!competitorKeywordsMap.has(key)) {
          competitorKeywordsMap.set(key, []);
        }

        // Buscar última posición en rankings
        const latestRanking = competitor.rankings
          .filter((r) => r.keyword.toLowerCase() === compKw.keyword.toLowerCase())
          .sort((a, b) => b.date.getTime() - a.date.getTime())[0];

        competitorKeywordsMap.get(key)!.push({
          keyword: compKw.keyword, // Guardar keyword original
          competitor: competitor.domain,
          competitorName: competitor.name || competitor.domain,
          position: latestRanking?.position || compKw.position || null,
          volume: compKw.monthlyVolume || null,
          url: latestRanking?.url || compKw.targetUrl || null,
        });
      }
    }

    // Keywords únicas nuestras (que competidores no tienen)
    const ourUniqueKeywords: Array<{
      keyword: string;
      position: number | null;
      volume: number | null;
      clicks: number;
      impressions: number;
    }> = [];

    for (const [kwLower, ourData] of ourKeywordsMap.entries()) {
      if (!competitorKeywordsMap.has(kwLower)) {
        ourUniqueKeywords.push(ourData);
      }
    }

    // Keywords donde estamos mejor posicionados
    const ourAdvantages: Array<{
      keyword: string;
      ourPosition: number;
      competitorPositions: Array<{
        competitor: string;
        position: number | null;
      }>;
    }> = [];

    for (const [kwLower, ourData] of ourKeywordsMap.entries()) {
      if (ourData.position && ourData.position <= 20) {
        // Solo consideramos si estamos en top 20
        const compData = competitorKeywordsMap.get(kwLower);
        if (compData && compData.length > 0) {
          // Verificar si estamos mejor que al menos un competidor
          const betterThanCompetitors = compData.some(
            (c) => !c.position || c.position > ourData.position!,
          );

          if (betterThanCompetitors) {
            ourAdvantages.push({
              keyword: ourData.keyword,
              ourPosition: ourData.position!,
              competitorPositions: compData.map((c) => ({
                competitor: c.competitor,
                position: c.position,
              })),
            });
          }
        }
      }
    }

    // Oportunidades: keywords que competidores tienen pero nosotros no
    const opportunities: Array<{
      keyword: string;
      ourPosition: number | null;
      competitorPositions: Array<{
        keyword: string;
        competitor: string;
        competitorName: string;
        position: number | null;
        volume: number | null;
        url: string | null;
      }>;
      bestCompetitorPosition: number | null;
      volume: number | null;
      priority: 'alta' | 'media' | 'baja';
      recommendation: string;
    }> = [];

    for (const [kwLower, compData] of competitorKeywordsMap.entries()) {
      if (!ourKeywordsMap.has(kwLower)) {
        // Esta keyword la tienen competidores pero nosotros no
        const bestPosition = compData
          .map((c) => c.position)
          .filter((p): p is number => p !== null)
          .sort((a, b) => a - b)[0] || null;

        // Buscar volumen máximo
        const maxVolume =
          compData
            .map((c) => c.volume)
            .filter((v): v is number => v !== null)
            .sort((a, b) => b - a)[0] || null;

        // Determinar prioridad
        const keywordOriginal = compData[0]?.keyword || kwLower;
        let priority: 'alta' | 'media' | 'baja' = 'baja';
        let recommendation = `Considera crear contenido para la keyword "${keywordOriginal}".`;

        if (maxVolume && maxVolume > 500 && bestPosition && bestPosition <= 10) {
          priority = 'alta';
          recommendation = `¡Alta oportunidad! Crea una landing page optimizada para "${keywordOriginal}" (${maxVolume} búsquedas/mes, competidores en posición ${bestPosition}).`;
        } else if (maxVolume && maxVolume > 100 && bestPosition && bestPosition <= 20) {
          priority = 'media';
          recommendation = `Buena oportunidad. Integra "${keywordOriginal}" en tu contenido existente o crea un artículo de blog.`;
        }

        opportunities.push({
          keyword: keywordOriginal,
          ourPosition: null,
          competitorPositions: compData,
          bestCompetitorPosition: bestPosition,
          volume: maxVolume,
          priority,
          recommendation,
        });
      } else {
        // Esta keyword la tenemos, pero comparamos posiciones
        const ourData = ourKeywordsMap.get(kwLower)!;
        const bestCompPosition = compData
          .map((c) => c.position)
          .filter((p): p is number => p !== null)
          .sort((a, b) => a - b)[0] || null;

        // Si competidores están mejor posicionados, es una oportunidad
        if (
          bestCompPosition &&
          (!ourData.position || bestCompPosition < ourData.position)
        ) {
          const maxVolume =
            compData
              .map((c) => c.volume)
              .filter((v): v is number => v !== null)
              .sort((a, b) => b - a)[0] || null;

          let priority: 'alta' | 'media' | 'baja' = 'baja';
          let recommendation = `Mejora tu contenido para "${ourData.keyword}" para superar a competidores.`;

          if (
            maxVolume &&
            maxVolume > 500 &&
            bestCompPosition <= 10 &&
            (!ourData.position || ourData.position > 20)
          ) {
            priority = 'alta';
            recommendation = `¡Prioridad alta! Mejora tu posicionamiento para "${ourData.keyword}" (${maxVolume} búsquedas/mes, competidores en ${bestCompPosition}, tú en ${ourData.position || 'N/A'}).`;
          } else if (maxVolume && maxVolume > 100 && bestCompPosition <= 20) {
            priority = 'media';
            recommendation = `Optimiza tu página para "${ourData.keyword}" para mejorar tu posición actual (${ourData.position || 'N/A'}) y superar a competidores (${bestCompPosition}).`;
          }

          opportunities.push({
            keyword: ourData.keyword,
            ourPosition: ourData.position,
            competitorPositions: compData,
            bestCompetitorPosition: bestCompPosition,
            volume: maxVolume || ourData.volume,
            priority,
            recommendation,
          });
        }
      }
    }

    // Ordenar oportunidades por prioridad y volumen
    opportunities.sort((a, b) => {
      const priorityOrder = { alta: 3, media: 2, baja: 1 };
      if (priorityOrder[b.priority] !== priorityOrder[a.priority]) {
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      }
      return (b.volume || 0) - (a.volume || 0);
    });

    // Calcular resumen
    const highPriorityOpportunities = opportunities.filter((o) => o.priority === 'alta').length;
    const summary = {
      keywordsWeHave: ourKeywordsMap.size,
      keywordsCompetitorsHave: competitorKeywordsMap.size,
      opportunitiesCount: opportunities.length,
      highPriorityOpportunities,
    };

    return {
      ourUniqueKeywords: ourUniqueKeywords.slice(0, 100),
      opportunities: opportunities.slice(0, 100),
      ourAdvantages: ourAdvantages.slice(0, 50),
      competitorsAnalyzed: competitors.length,
      totalCompetitorKeywords: competitorKeywordsMap.size,
      summary,
    };
  }

  /**
   * Analiza buenas prácticas SEO del competidor usando servicio especializado
   */
  private async analyzeCompetitorBestPractices(competitorId: string, url: string) {
    try {
      const insights = await this.insightsService.analyzePageSeo(url);
      const summary = this.insightsService.generateSummary(insights);

      this.logger.log(
        `📊 Análisis SEO competidor ${competitorId}: Score ${summary.score}/100 ` +
        `(${summary.good} buenas, ${summary.warnings} advertencias, ${summary.bad} malas)`,
      );

      // Log de recomendaciones principales
      if (summary.topRecommendations.length > 0) {
        this.logger.log(`💡 Recomendaciones: ${summary.topRecommendations.slice(0, 3).join('; ')}`);
      }
    } catch (error: any) {
      this.logger.warn(`Error analizando buenas prácticas: ${error.message}`);
    }
  }

  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

