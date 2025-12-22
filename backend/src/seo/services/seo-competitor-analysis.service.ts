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
        this.logger.log(`Buscando keywords reales de ${competitor.domain} en Google...`);
        discoveredKeywords = await this.serpApi.discoverDomainKeywords(
          cleanDomain,
          baseKeywords,
          'Viladecans, Barcelona, Spain',
        );
        this.logger.log(`✅ Encontradas ${discoveredKeywords.length} keywords reales`);
      } catch (error: any) {
        if (error.message.includes('SERPAPI_API_KEY')) {
          this.logger.error(`⚠️ ${error.message}. Usando método de análisis alternativo (scraping).`);
          // Fallback a scraping si no hay API key
          discoveredKeywords = await this.discoverKeywordsViaScraping(competitor.url);
        } else {
          throw error;
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
            ranks: {
              orderBy: { date: 'desc' },
              take: 1,
            },
            volumes: {
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
        keywords: {
          include: {
            competitor: true,
          },
        },
      },
    });

    // Comparar keywords
    const ourKeywords = new Set(
      site.keywords.map((k) => k.keyword.toLowerCase()),
    );
    const competitorKeywords = new Map<string, Set<string>>();

    for (const competitor of competitors) {
      const keywords = new Set(
        competitor.keywords.map((k) => k.keyword.toLowerCase()),
      );
      competitorKeywords.set(competitor.domain, keywords);
    }

    // Keywords que tenemos pero competidores no
    const ourUniqueKeywords: string[] = [];
    for (const ourKw of ourKeywords) {
      let unique = true;
      for (const compKeywords of competitorKeywords.values()) {
        if (compKeywords.has(ourKw)) {
          unique = false;
          break;
        }
      }
      if (unique) {
        ourUniqueKeywords.push(ourKw);
      }
    }

    // Keywords que competidores tienen pero nosotros no (oportunidades)
    const opportunities: Array<{
      keyword: string;
      competitors: string[];
      volume: number | null;
    }> = [];

    const allCompetitorKeywords = new Set<string>();
    for (const compKeywords of competitorKeywords.values()) {
      compKeywords.forEach((kw) => allCompetitorKeywords.add(kw));
    }

    for (const compKw of allCompetitorKeywords) {
      if (!ourKeywords.has(compKw)) {
        const competitorsUsing = Array.from(competitorKeywords.entries())
          .filter(([_, keywords]) => keywords.has(compKw))
          .map(([domain]) => domain);

        if (competitorsUsing.length > 0) {
          // Buscar volumen si está guardado
          let volume: number | null = null;
          for (const competitor of competitors) {
            const compKeyword = competitor.keywords.find(
              (k) => k.keyword.toLowerCase() === compKw,
            );
            if (compKeyword?.monthlyVolume) {
              volume = compKeyword.monthlyVolume;
              break;
            }
          }

          opportunities.push({
            keyword: compKw,
            competitors: competitorsUsing,
            volume,
          });
        }
      }
    }

    // Ordenar oportunidades por número de competidores y volumen
    opportunities.sort((a, b) => {
      if (b.competitors.length !== a.competitors.length) {
        return b.competitors.length - a.competitors.length;
      }
      return (b.volume || 0) - (a.volume || 0);
    });

    return {
      ourUniqueKeywords,
      opportunities: opportunities.slice(0, 100), // Top 100
      competitorsAnalyzed: competitors.length,
      totalCompetitorKeywords: allCompetitorKeywords.size,
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

