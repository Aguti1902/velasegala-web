import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
import * as cheerio from 'cheerio';

export interface CompetitorInsight {
  type: 'good' | 'warning' | 'bad';
  category: string;
  title: string;
  description: string;
  value?: string | number;
}

@Injectable()
export class SeoCompetitorInsightsService {
  private readonly logger = new Logger(SeoCompetitorInsightsService.name);

  /**
   * Analiza buenas prácticas SEO de una página
   */
  async analyzePageSeo(url: string): Promise<CompetitorInsight[]> {
    const insights: CompetitorInsight[] = [];

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
        insights.push({
          type: 'bad',
          category: 'accesibilidad',
          title: 'Página no accesible',
          description: `La página retornó código ${response.status}`,
        });
        return insights;
      }

      const $ = cheerio.load(response.data);
      const html = response.data;

      // 1. Análisis de Title
      const title = $('title').text().trim();
      if (!title) {
        insights.push({
          type: 'bad',
          category: 'on-page',
          title: 'Falta title tag',
          description: 'La página no tiene etiqueta <title>',
        });
      } else {
        const titleLength = title.length;
        if (titleLength >= 30 && titleLength <= 60) {
          insights.push({
            type: 'good',
            category: 'on-page',
            title: 'Title optimizado',
            description: `Longitud ideal (${titleLength} caracteres)`,
            value: titleLength,
          });
        } else if (titleLength < 30) {
          insights.push({
            type: 'warning',
            category: 'on-page',
            title: 'Title muy corto',
            description: `Solo ${titleLength} caracteres (ideal: 30-60)`,
            value: titleLength,
          });
        } else {
          insights.push({
            type: 'warning',
            category: 'on-page',
            title: 'Title muy largo',
            description: `${titleLength} caracteres (ideal: 30-60). Google lo truncará.`,
            value: titleLength,
          });
        }

        // Verificar uso de keyword local
        if (title.toLowerCase().includes('viladecans')) {
          insights.push({
            type: 'good',
            category: 'local-seo',
            title: 'Title incluye localización',
            description: 'El title incluye "Viladecans" para SEO local',
          });
        }
      }

      // 2. Análisis de Meta Description
      const metaDescription = $('meta[name="description"]').attr('content');
      if (!metaDescription) {
        insights.push({
          type: 'warning',
          category: 'on-page',
          title: 'Falta meta description',
          description: 'No tiene meta description definida',
        });
      } else {
        const descLength = metaDescription.length;
        if (descLength >= 120 && descLength <= 160) {
          insights.push({
            type: 'good',
            category: 'on-page',
            title: 'Meta description optimizada',
            description: `Longitud ideal (${descLength} caracteres)`,
            value: descLength,
          });
        } else if (descLength < 120) {
          insights.push({
            type: 'warning',
            category: 'on-page',
            title: 'Meta description corta',
            description: `Solo ${descLength} caracteres (ideal: 120-160)`,
            value: descLength,
          });
        } else {
          insights.push({
            type: 'warning',
            category: 'on-page',
            title: 'Meta description larga',
            description: `${descLength} caracteres (ideal: 120-160). Google la truncará.`,
            value: descLength,
          });
        }
      }

      // 3. Análisis de H1
      const h1s = $('h1');
      const h1Count = h1s.length;
      if (h1Count === 0) {
        insights.push({
          type: 'bad',
          category: 'on-page',
          title: 'Falta H1',
          description: 'La página no tiene ningún H1',
        });
      } else if (h1Count === 1) {
        const h1Text = h1s.first().text().trim();
        insights.push({
          type: 'good',
          category: 'on-page',
          title: 'Un solo H1 (correcto)',
          description: `H1: "${h1Text.substring(0, 50)}${h1Text.length > 50 ? '...' : ''}"`,
        });

        // Verificar uso de keyword local en H1
        if (h1Text.toLowerCase().includes('viladecans')) {
          insights.push({
            type: 'good',
            category: 'local-seo',
            title: 'H1 incluye localización',
            description: 'El H1 incluye "Viladecans"',
          });
        }
      } else {
        insights.push({
          type: 'warning',
          category: 'on-page',
          title: 'Múltiples H1',
          description: `Tiene ${h1Count} H1s. Idealmente debería tener solo uno.`,
          value: h1Count,
        });
      }

      // 4. Análisis de H2s (estructura)
      const h2s = $('h2');
      const h2Count = h2s.length;
      if (h2Count >= 3) {
        insights.push({
          type: 'good',
          category: 'estructura',
          title: 'Buena estructura de headings',
          description: `Tiene ${h2Count} H2s, estructura clara`,
          value: h2Count,
        });
      } else if (h2Count > 0) {
        insights.push({
          type: 'warning',
          category: 'estructura',
          title: 'Pocos H2s',
          description: `Solo ${h2Count} H2s. Considera añadir más para mejor estructura`,
          value: h2Count,
        });
      }

      // 5. Análisis de contenido (aproximado)
      const bodyText = $('body').text().replace(/\s+/g, ' ').trim();
      const wordCount = bodyText.split(' ').filter((w) => w.length > 0).length;
      if (wordCount >= 300) {
        insights.push({
          type: 'good',
          category: 'contenido',
          title: 'Contenido suficiente',
          description: `Aproximadamente ${wordCount} palabras`,
          value: wordCount,
        });
      } else if (wordCount > 0) {
        insights.push({
          type: 'warning',
          category: 'contenido',
          title: 'Contenido escaso',
          description: `Solo ~${wordCount} palabras. Idealmente más de 300`,
          value: wordCount,
        });
      }

      // 6. Enlaces internos
      const internalLinks = $('a[href^="/"], a[href*="' + new URL(url).hostname + '"]');
      const internalLinkCount = internalLinks.length;
      if (internalLinkCount >= 5) {
        insights.push({
          type: 'good',
          category: 'enlazado',
          title: 'Enlazado interno presente',
          description: `${internalLinkCount} enlaces internos detectados`,
          value: internalLinkCount,
        });
      }

      // 7. Schema markup
      const schemaScripts = $('script[type="application/ld+json"]');
      const schemaCount = schemaScripts.length;
      if (schemaCount > 0) {
        insights.push({
          type: 'good',
          category: 'schema',
          title: 'Schema markup implementado',
          description: `${schemaCount} esquema(s) JSON-LD encontrado(s)`,
          value: schemaCount,
        });
      } else {
        insights.push({
          type: 'warning',
          category: 'schema',
          title: 'Falta schema markup',
          description: 'No se detectó schema JSON-LD. Recomendado para SEO local',
        });
      }

      // 8. Imágenes con alt text
      const images = $('img');
      const imagesWithAlt = images.filter((_, el) => !!$(el).attr('alt')).length;
      const totalImages = images.length;
      if (totalImages > 0) {
        const altPercentage = (imagesWithAlt / totalImages) * 100;
        if (altPercentage >= 80) {
          insights.push({
            type: 'good',
            category: 'imágenes',
            title: 'Alt texts presentes',
            description: `${imagesWithAlt}/${totalImages} imágenes con alt text (${altPercentage.toFixed(0)}%)`,
            value: altPercentage,
          });
        } else {
          insights.push({
            type: 'warning',
            category: 'imágenes',
            title: 'Faltan alt texts',
            description: `Solo ${imagesWithAlt}/${totalImages} imágenes tienen alt text`,
            value: altPercentage,
          });
        }
      }

      // 9. Uso de keywords locales en contenido
      const localKeywords = ['viladecans', 'barcelona', 'clínica dental', 'dentista'];
      const foundLocalKeywords = localKeywords.filter((kw) =>
        bodyText.toLowerCase().includes(kw),
      );
      if (foundLocalKeywords.length >= 2) {
        insights.push({
          type: 'good',
          category: 'local-seo',
          title: 'Contenido local optimizado',
          description: `Incluye keywords locales: ${foundLocalKeywords.join(', ')}`,
        });
      }

      // 10. Contacto visible (teléfono, dirección)
      const hasPhone = /(\+34|93|936|9[0-9]{2})\s?[0-9]{3}\s?[0-9]{2}\s?[0-9]{2}/.test(bodyText);
      const hasAddress = /viladecans|barcelona|calle|avenida|rambla/i.test(bodyText);
      if (hasPhone && hasAddress) {
        insights.push({
          type: 'good',
          category: 'local-seo',
          title: 'Datos de contacto visibles',
          description: 'Teléfono y dirección presentes en la página',
        });
      } else if (hasPhone || hasAddress) {
        insights.push({
          type: 'warning',
          category: 'local-seo',
          title: 'Contacto parcial',
          description: hasPhone ? 'Tiene teléfono pero falta dirección' : 'Tiene dirección pero falta teléfono',
        });
      }

    } catch (error: any) {
      this.logger.error(`Error analizando página ${url}:`, error.message);
      insights.push({
        type: 'bad',
        category: 'accesibilidad',
        title: 'Error al analizar',
        description: error.message,
      });
    }

    return insights;
  }

  /**
   * Genera resumen de buenas prácticas
   */
  generateSummary(insights: CompetitorInsight[]): {
    score: number;
    good: number;
    warnings: number;
    bad: number;
    topRecommendations: string[];
  } {
    const good = insights.filter((i) => i.type === 'good').length;
    const warnings = insights.filter((i) => i.type === 'warning').length;
    const bad = insights.filter((i) => i.type === 'bad').length;
    const total = insights.length;

    const score = total > 0 ? Math.round((good / total) * 100) : 0;

    // Top recomendaciones (basadas en warnings y bad)
    const topRecommendations = insights
      .filter((i) => i.type === 'warning' || i.type === 'bad')
      .slice(0, 5)
      .map((i) => i.description);

    return {
      score,
      good,
      warnings,
      bad,
      topRecommendations,
    };
  }
}

