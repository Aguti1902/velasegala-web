import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { KeywordVolumeService } from './keyword-volume.service';

@Injectable()
export class SeoKeywordDiscoveryService {
  private readonly logger = new Logger(SeoKeywordDiscoveryService.name);

  constructor(
    private prisma: PrismaService,
    private volumeService: KeywordVolumeService,
  ) {}

  /**
   * Descubre nuevas keywords relacionadas con alto volumen de búsqueda
   */
  async discoverKeywords(siteId: string, minVolume: number = 100) {
    this.logger.log(
      `Descubriendo keywords para sitio ${siteId} con volumen mínimo ${minVolume}`,
    );

    // Obtener keywords existentes para encontrar variaciones y relacionadas
    const existingKeywords = await this.prisma.seoKeyword.findMany({
      where: { siteId },
      select: { keyword: true, tags: true },
    });

    // Generar keywords candidatas basadas en las existentes
    const candidateKeywords = this.generateKeywordCandidates(existingKeywords);

    // Verificar volumen de búsqueda para cada candidata
    const discoveredKeywords: Array<{
      keyword: string;
      volume: number;
      intent: string;
      tags: string[];
      targetUrl?: string;
    }> = [];

    for (const candidate of candidateKeywords) {
      try {
        const volumeData = await this.volumeService.getKeywordVolume(
          candidate.keyword,
          'ES',
        );

        if (volumeData.volume && volumeData.volume >= minVolume) {
          // Verificar si la keyword ya existe
          const exists = existingKeywords.some(
            (ek) => ek.keyword.toLowerCase() === candidate.keyword.toLowerCase(),
          );

          if (!exists) {
            discoveredKeywords.push({
              keyword: candidate.keyword,
              volume: volumeData.volume,
              intent: this.detectIntent(candidate.keyword),
              tags: candidate.tags,
              targetUrl: candidate.targetUrl,
            });
          }
        }

        // Pequeña pausa para no sobrecargar la API
        await this.sleep(200);
      } catch (error: any) {
        this.logger.warn(
          `Error al verificar volumen de "${candidate.keyword}":`,
          error.message,
        );
      }
    }

    // Ordenar por volumen (mayor primero)
    discoveredKeywords.sort((a, b) => b.volume - a.volume);

    this.logger.log(
      `✅ Descubiertas ${discoveredKeywords.length} keywords con volumen >= ${minVolume}`,
    );

    return discoveredKeywords;
  }

  /**
   * Genera candidatos de keywords basados en las existentes
   */
  private generateKeywordCandidates(
    existingKeywords: Array<{ keyword: string; tags: string[] }>,
  ): Array<{
    keyword: string;
    tags: string[];
    targetUrl?: string;
  }> {
    const candidates: Array<{
      keyword: string;
      tags: string[];
      targetUrl?: string;
    }> = [];

    // Variaciones de keywords existentes
    const baseTerms = [
      'viladecans',
      'barcelona',
      'dentista',
      'clínica dental',
      'dental',
    ];

    // Keywords relacionadas con tratamientos dentales comunes
    const treatmentKeywords = [
      // Implantes
      'implantología viladecans',
      'implantes dentales barcelona',
      'cirugía implantes viladecans',
      'rehabilitación oral viladecans',
      'implantología avanzada viladecans',
      'implantes zirconio viladecans',
      'implantes all on 4 viladecans',
      'implantes all on 6 viladecans',

      // Ortodoncia
      'ortodoncia barcelona',
      'ortodoncia infantil viladecans',
      'brackets estéticos viladecans',
      'ortodoncia metalica viladecans',
      'ortodoncia damon viladecans',
      'alineadores transparentes viladecans',

      // Estética
      'carillas barcelona',
      'sonrisa perfecta viladecans',
      'diseño sonrisa digital viladecans',
      'carillas composite viladecans',
      'carillas lumineers viladecans',
      'gummy smile viladecans',
      'contorneado dental viladecans',

      // Blanqueamiento
      'blanqueamiento barcelona',
      'blanqueamiento dental led viladecans',
      'blanqueamiento dientes viladecans',

      // Periodoncia
      'encías sangrantes viladecans',
      'tratamiento piorrea viladecans',
      'limpieza profunda encías viladecans',
      'curetaje dental viladecans',

      // Endodoncia
      'endodoncia barcelona',
      'tratamiento de conductos viladecans',
      'endodoncista viladecans',
      'matar nervio diente viladecans',

      // Prótesis
      'coronas dentales viladecans',
      'fundas dentales viladecans',
      'dentadura completa viladecans',
      'prótesis fijas viladecans',
      'prótesis removibles viladecans',

      // Cirugía
      'extracción muelas viladecans',
      'cirugía bucal viladecans',
      'extracción cordales viladecans',
      'injerto óseo viladecans',
      'elevación seno maxilar viladecans',

      // Bruxismo
      'férula oclusal viladecans',
      'rechinamiento dientes viladecans',
      'protector dental viladecans',

      // Odontopediatría
      'dentista niños barcelona',
      'ortodoncia niños viladecans',
      'selladores dentales viladecans',
      'flúor niños viladecans',

      // Limpieza
      'limpieza dental barcelona',
      'higiene bucal viladecans',
      'eliminación sarro viladecans',

      // Urgencias
      'dentista 24 horas viladecans',
      'urgencia dental viladecans',
      'dolor diente viladecans',
      'flemón viladecans',
      'absceso dental viladecans',

      // Servicios generales
      'consulta dental viladecans',
      'revisión dental viladecans',
      'radiografías dentales viladecans',
      'tac dental viladecans',
      'escáner intraoral viladecans',
      'financiación dental viladecans',
      'seguro dental viladecans',
    ];

    treatmentKeywords.forEach((keyword) => {
      const tags = this.extractTags(keyword);
      candidates.push({
        keyword,
        tags,
        targetUrl: this.suggestTargetUrl(keyword),
      });
    });

    // Variaciones con modificadores de búsqueda
    const modifiers = [
      'mejor',
      'precio',
      'barato',
      'recomendado',
      'cerca de mi',
      'cerca',
      'opiniones',
      'reseñas',
      'horarios',
      'dirección',
      'teléfono',
      'contacto',
      'primera visita gratis',
      'sin compromiso',
      'presupuesto gratis',
      'financiación',
    ];

    const baseKeywords = existingKeywords.map((ek) => ek.keyword);

    for (const base of baseKeywords.slice(0, 10)) {
      // Extraer término base (sin viladecans/barcelona)
      const baseTerm = base
        .replace(/viladecans/gi, '')
        .replace(/barcelona/gi, '')
        .trim();

      for (const modifier of modifiers) {
        candidates.push({
          keyword: `${modifier} ${baseTerm} viladecans`.trim(),
          tags: ['long-tail', 'variación'],
          targetUrl: '/pedir-cita',
        });
      }
    }

    // Keywords de intención comercial/navegacional
    const commercialKeywords = [
      'clínica dental viladecans horarios',
      'dentista viladecans teléfono',
      'pedir cita dentista viladecans',
      'cita dentista viladecans',
      'consulta dental viladecans precio',
      'revisión dental viladecans gratis',
      'clínica dental viladecans dirección',
      'dentista viladecans opiniones',
      'dentista viladecans reseñas',
      'mejor clínica dental viladecans',
      'clínica dental viladecans precio',
      'dentista viladecans barato',
      'clínica dental viladecans financiación',
    ];

    commercialKeywords.forEach((keyword) => {
      candidates.push({
        keyword,
        tags: ['comercial', 'navegacional'],
        targetUrl: '/pedir-cita',
      });
    });

    return candidates;
  }

  /**
   * Detecta la intención de búsqueda de una keyword
   */
  private detectIntent(keyword: string): string {
    const keywordLower = keyword.toLowerCase();

    // Navegacional
    if (
      keywordLower.includes('dirección') ||
      keywordLower.includes('teléfono') ||
      keywordLower.includes('contacto') ||
      keywordLower.includes('horarios') ||
      keywordLower.includes('cerca')
    ) {
      return 'navigational';
    }

    // Transaccional
    if (
      keywordLower.includes('precio') ||
      keywordLower.includes('coste') ||
      keywordLower.includes('barato') ||
      keywordLower.includes('pedir cita') ||
      keywordLower.includes('consulta') ||
      keywordLower.includes('tratamiento') ||
      keywordLower.includes('mejor') ||
      keywordLower.includes('recomendado') ||
      keywordLower.includes('opiniones') ||
      keywordLower.includes('reseñas') ||
      keywordLower.includes('financiación')
    ) {
      return 'transactional';
    }

    // Por defecto, informacional
    return 'informational';
  }

  /**
   * Extrae tags relevantes de una keyword
   */
  private extractTags(keyword: string): string[] {
    const keywordLower = keyword.toLowerCase();
    const tags: string[] = [];

    // Tags por tratamiento
    if (keywordLower.includes('implante')) tags.push('implantes');
    if (keywordLower.includes('ortodoncia')) tags.push('ortodoncia');
    if (keywordLower.includes('estética') || keywordLower.includes('carilla'))
      tags.push('estética');
    if (keywordLower.includes('blanqueamiento')) tags.push('blanqueamiento');
    if (keywordLower.includes('periodoncia') || keywordLower.includes('encía'))
      tags.push('periodoncia');
    if (keywordLower.includes('endodoncia') || keywordLower.includes('conducto'))
      tags.push('endodoncia');
    if (keywordLower.includes('prótesis') || keywordLower.includes('corona'))
      tags.push('prótesis');
    if (keywordLower.includes('cirugía') || keywordLower.includes('extracción'))
      tags.push('cirugía');
    if (keywordLower.includes('bruxismo') || keywordLower.includes('férula'))
      tags.push('bruxismo');
    if (keywordLower.includes('niño') || keywordLower.includes('infantil'))
      tags.push('odontopediatría');
    if (keywordLower.includes('limpieza') || keywordLower.includes('higiene'))
      tags.push('limpieza');
    if (keywordLower.includes('urgencia') || keywordLower.includes('dolor'))
      tags.push('urgencias');

    // Tags generales
    if (keywordLower.includes('barcelona')) tags.push('barcelona');
    if (keywordLower.includes('viladecans')) tags.push('viladecans');
    if (keywordLower.includes('precio')) tags.push('precio');
    if (keywordLower.includes('mejor')) tags.push('calidad');
    if (keywordLower.includes('recomendado')) tags.push('recomendado');

    return tags.length > 0 ? tags : ['general'];
  }

  /**
   * Sugiere URL objetivo basada en la keyword
   */
  private suggestTargetUrl(keyword: string): string | undefined {
    const keywordLower = keyword.toLowerCase();
    const baseUrl = 'https://www.velasegalaviladecans.com';

    if (keywordLower.includes('implante'))
      return `${baseUrl}/tratamientos/implantes-dentales-viladecans`;
    if (keywordLower.includes('ortodoncia'))
      return `${baseUrl}/tratamientos/ortodoncia-invisible-viladecans`;
    if (keywordLower.includes('estética') || keywordLower.includes('carilla'))
      return `${baseUrl}/tratamientos/estetica-dental-viladecans`;
    if (keywordLower.includes('blanqueamiento'))
      return `${baseUrl}/tratamientos/blanqueamiento-dental-viladecans`;
    if (keywordLower.includes('periodoncia') || keywordLower.includes('encía'))
      return `${baseUrl}/tratamientos/periodoncia-viladecans`;
    if (keywordLower.includes('endodoncia') || keywordLower.includes('conducto'))
      return `${baseUrl}/tratamientos/endodoncia-viladecans`;
    if (keywordLower.includes('prótesis') || keywordLower.includes('corona'))
      return `${baseUrl}/tratamientos/protesis-dentales-viladecans`;
    if (keywordLower.includes('cirugía') || keywordLower.includes('extracción'))
      return `${baseUrl}/tratamientos/cirugia-oral-viladecans`;
    if (keywordLower.includes('bruxismo') || keywordLower.includes('férula'))
      return `${baseUrl}/tratamientos/bruxismo-viladecans`;
    if (keywordLower.includes('niño') || keywordLower.includes('infantil'))
      return `${baseUrl}/tratamientos/odontopediatria-viladecans`;
    if (keywordLower.includes('limpieza') || keywordLower.includes('higiene'))
      return `${baseUrl}/tratamientos/limpieza-dental-viladecans`;
    if (keywordLower.includes('urgencia') || keywordLower.includes('dolor'))
      return `${baseUrl}/tratamientos/urgencias-dentales-viladecans`;
    if (keywordLower.includes('cita') || keywordLower.includes('consulta'))
      return `${baseUrl}/pedir-cita`;
    if (keywordLower.includes('tratamiento'))
      return `${baseUrl}/tratamientos`;

    return undefined;
  }

  /**
   * Guarda keywords descubiertas como sugerencias
   */
  async saveDiscoveredKeywords(
    siteId: string,
    discoveredKeywords: Array<{
      keyword: string;
      volume: number;
      intent: string;
      tags: string[];
      targetUrl?: string;
    }>,
  ) {
    let saved = 0;
    let skipped = 0;

    for (const kw of discoveredKeywords) {
      try {
        // Verificar si ya existe
        const existing = await this.prisma.seoKeyword.findFirst({
          where: {
            siteId,
            keyword: kw.keyword,
          },
        });

        if (existing) {
          skipped++;
          // Actualizar volumen si no existe o es más antiguo
          await this.prisma.seoKeywordVolumeMonthly.upsert({
            where: {
              keywordId_provider_country: {
                keywordId: existing.id,
                provider: 'dataforseo',
                country: 'ES',
              },
            },
            update: {
              volume: kw.volume,
              updatedAt: new Date(),
            },
            create: {
              keywordId: existing.id,
              provider: 'dataforseo',
              country: 'ES',
              volume: kw.volume,
            },
          });
          continue;
        }

        // Crear keyword con flag de descubierta
        const newKeyword = await this.prisma.seoKeyword.create({
          data: {
            siteId,
            keyword: kw.keyword,
            intent: kw.intent,
            targetUrl: kw.targetUrl,
            tags: kw.tags,
            discovered: true,
          },
        });

        // Guardar volumen de búsqueda
        await this.prisma.seoKeywordVolumeMonthly.create({
          data: {
            keywordId: newKeyword.id,
            provider: 'dataforseo',
            country: 'ES',
            volume: kw.volume,
          },
        });

        saved++;
      } catch (error: any) {
        this.logger.error(`Error al guardar keyword "${kw.keyword}":`, error.message);
      }
    }

    this.logger.log(`✅ Guardadas ${saved} keywords nuevas, ${skipped} ya existían`);

    return { saved, skipped };
  }

  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

