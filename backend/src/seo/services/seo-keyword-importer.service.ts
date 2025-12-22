import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class SeoKeywordImporterService {
  private readonly logger = new Logger(SeoKeywordImporterService.name);

  constructor(private prisma: PrismaService) {}

  /**
   * Importa todas las keywords de la web actual y añade sugerencias
   */
  async importAllKeywords(siteId: string) {
    this.logger.log(`Importando keywords para sitio ${siteId}`);

    const keywords = this.getAllKeywordsFromWebsite();
    let imported = 0;
    let updated = 0;

    for (const kw of keywords) {
      try {
        const existing = await this.prisma.seoKeyword.findFirst({
          where: {
            siteId,
            keyword: kw.keyword,
          },
        });

        if (existing) {
          // Actualizar si cambió algo importante
          await this.prisma.seoKeyword.update({
            where: { id: existing.id },
            data: {
              intent: kw.intent || existing.intent,
              targetUrl: kw.targetUrl || existing.targetUrl,
              tags: kw.tags || existing.tags,
            },
          });
          updated++;
        } else {
          // Crear nueva keyword
          await this.prisma.seoKeyword.create({
            data: {
              siteId,
              keyword: kw.keyword,
              intent: kw.intent,
              targetUrl: kw.targetUrl,
              tags: kw.tags,
              discovered: false, // Marcadas como manuales (de la web)
            },
          });
          imported++;
        }
      } catch (error: any) {
        this.logger.error(`Error al importar keyword "${kw.keyword}":`, error.message);
      }
    }

    this.logger.log(
      `✅ Keywords importadas: ${imported} nuevas, ${updated} actualizadas`,
    );

    return { imported, updated, total: keywords.length };
  }

  /**
   * Extrae todas las keywords de la web actual
   */
  private getAllKeywordsFromWebsite() {
    const keywords: Array<{
      keyword: string;
      intent: string;
      targetUrl?: string;
      tags: string[];
    }> = [];

    // ===== KEYWORDS GENERALES (HOME/Layout) =====
    const generalKeywords = [
      'clínica dental viladecans',
      'dentista viladecans',
      'clínica dental en viladecans',
      'dentista en viladecans',
      'implantes dentales viladecans',
      'ortodoncia viladecans',
      'ortodoncia invisible viladecans',
      'estética dental viladecans',
    ];

    generalKeywords.forEach((kw) => {
      keywords.push({
        keyword: kw,
        intent: 'informational',
        targetUrl: 'https://www.velasegalaviladecans.com',
        tags: ['general', 'home'],
      });
    });

    // ===== IMPLANTES DENTALES =====
    const implantesKeywords = [
      { kw: 'implantes dentales viladecans', url: '/tratamientos/implantes-dentales-viladecans' },
      { kw: 'implantología dental viladecans', url: '/tratamientos/implantes-dentales-viladecans' },
      { kw: 'precio implantes viladecans', url: '/tratamientos/implantes-dentales-viladecans' },
      { kw: 'implantes inmediatos viladecans', url: '/tratamientos/implantes-dentales-viladecans' },
      { kw: 'implantes dentales barcelona', url: '/tratamientos/implantes-dentales-viladecans' },
      { kw: 'clínica implantes viladecans', url: '/tratamientos/implantes-dentales-viladecans' },
      { kw: 'cirujano implantes viladecans', url: '/tratamientos/implantes-dentales-viladecans' },
    ];

    implantesKeywords.forEach(({ kw, url }) => {
      keywords.push({
        keyword: kw,
        intent: 'transactional',
        targetUrl: `https://www.velasegalaviladecans.com${url}`,
        tags: ['implantes', 'tratamientos'],
      });
    });

    // ===== ORTODONCIA INVISIBLE =====
    const ortodonciaKeywords = [
      { kw: 'ortodoncia invisible viladecans', url: '/tratamientos/ortodoncia-invisible-viladecans' },
      { kw: 'invisalign viladecans', url: '/tratamientos/ortodoncia-invisible-viladecans' },
      { kw: 'ortodoncia adultos viladecans', url: '/tratamientos/ortodoncia-invisible-viladecans' },
      { kw: 'brackets viladecans', url: '/tratamientos/ortodoncia-invisible-viladecans' },
      { kw: 'ortodoncia invisible precio viladecans', url: '/tratamientos/ortodoncia-invisible-viladecans' },
      { kw: 'alineadores invisibles viladecans', url: '/tratamientos/ortodoncia-invisible-viladecans' },
    ];

    ortodonciaKeywords.forEach(({ kw, url }) => {
      keywords.push({
        keyword: kw,
        intent: 'transactional',
        targetUrl: `https://www.velasegalaviladecans.com${url}`,
        tags: ['ortodoncia', 'tratamientos'],
      });
    });

    // ===== ESTÉTICA DENTAL =====
    const esteticaKeywords = [
      { kw: 'estética dental viladecans', url: '/tratamientos/estetica-dental-viladecans' },
      { kw: 'carillas dentales viladecans', url: '/tratamientos/estetica-dental-viladecans' },
      { kw: 'diseño de sonrisa viladecans', url: '/tratamientos/estetica-dental-viladecans' },
      { kw: 'carillas porcelana viladecans', url: '/tratamientos/estetica-dental-viladecans' },
      { kw: 'estética dental barcelona', url: '/tratamientos/estetica-dental-viladecans' },
      { kw: 'dentista estético viladecans', url: '/tratamientos/estetica-dental-viladecans' },
      { kw: 'carillas composite viladecans', url: '/tratamientos/estetica-dental-viladecans' },
    ];

    esteticaKeywords.forEach(({ kw, url }) => {
      keywords.push({
        keyword: kw,
        intent: 'transactional',
        targetUrl: `https://www.velasegalaviladecans.com${url}`,
        tags: ['estética', 'tratamientos'],
      });
    });

    // ===== BLANQUEAMIENTO DENTAL =====
    const blanqueamientoKeywords = [
      { kw: 'blanqueamiento dental viladecans', url: '/tratamientos/blanqueamiento-dental-viladecans' },
      { kw: 'blanqueamiento dental profesional viladecans', url: '/tratamientos/blanqueamiento-dental-viladecans' },
      { kw: 'blanquear dientes viladecans', url: '/tratamientos/blanqueamiento-dental-viladecans' },
      { kw: 'dientes blancos viladecans', url: '/tratamientos/blanqueamiento-dental-viladecans' },
      { kw: 'blanqueamiento dental led viladecans', url: '/tratamientos/blanqueamiento-dental-viladecans' },
      { kw: 'blanqueamiento dental precio viladecans', url: '/tratamientos/blanqueamiento-dental-viladecans' },
      { kw: 'blanqueamiento dental casa viladecans', url: '/tratamientos/blanqueamiento-dental-viladecans' },
      { kw: 'dentista blanqueamiento viladecans', url: '/tratamientos/blanqueamiento-dental-viladecans' },
    ];

    blanqueamientoKeywords.forEach(({ kw, url }) => {
      keywords.push({
        keyword: kw,
        intent: 'transactional',
        targetUrl: `https://www.velasegalaviladecans.com${url}`,
        tags: ['blanqueamiento', 'tratamientos'],
      });
    });

    // ===== ODONTOPEDIATRÍA =====
    const odontopediatriaKeywords = [
      { kw: 'odontopediatría viladecans', url: '/tratamientos/odontopediatria-viladecans' },
      { kw: 'dentista infantil viladecans', url: '/tratamientos/odontopediatria-viladecans' },
      { kw: 'dentista para niños viladecans', url: '/tratamientos/odontopediatria-viladecans' },
      { kw: 'dentista bebés viladecans', url: '/tratamientos/odontopediatria-viladecans' },
      { kw: 'dentista niños barcelona', url: '/tratamientos/odontopediatria-viladecans' },
    ];

    odontopediatriaKeywords.forEach(({ kw, url }) => {
      keywords.push({
        keyword: kw,
        intent: 'transactional',
        targetUrl: `https://www.velasegalaviladecans.com${url}`,
        tags: ['odontopediatría', 'tratamientos'],
      });
    });

    // ===== PERIODONCIA =====
    const periodonciaKeywords = [
      { kw: 'periodoncia viladecans', url: '/tratamientos/periodoncia-viladecans' },
      { kw: 'tratamiento encías viladecans', url: '/tratamientos/periodoncia-viladecans' },
      { kw: 'gingivitis viladecans', url: '/tratamientos/periodoncia-viladecans' },
      { kw: 'periodontitis viladecans', url: '/tratamientos/periodoncia-viladecans' },
      { kw: 'piorrea viladecans', url: '/tratamientos/periodoncia-viladecans' },
      { kw: 'periodoncista viladecans', url: '/tratamientos/periodoncia-viladecans' },
    ];

    periodonciaKeywords.forEach(({ kw, url }) => {
      keywords.push({
        keyword: kw,
        intent: 'informational',
        targetUrl: `https://www.velasegalaviladecans.com${url}`,
        tags: ['periodoncia', 'tratamientos'],
      });
    });

    // ===== ENDODONCIA =====
    const endodonciaKeywords = [
      { kw: 'endodoncia viladecans', url: '/tratamientos/endodoncia-viladecans' },
      { kw: 'tratamiento conductos viladecans', url: '/tratamientos/endodoncia-viladecans' },
      { kw: 'matar nervio diente viladecans', url: '/tratamientos/endodoncia-viladecans' },
      { kw: 'endodoncia precio', url: '/tratamientos/endodoncia-viladecans' },
      { kw: 'endodoncista viladecans', url: '/tratamientos/endodoncia-viladecans' },
    ];

    endodonciaKeywords.forEach(({ kw, url }) => {
      keywords.push({
        keyword: kw,
        intent: 'transactional',
        targetUrl: `https://www.velasegalaviladecans.com${url}`,
        tags: ['endodoncia', 'tratamientos'],
      });
    });

    // ===== PRÓTESIS DENTALES =====
    const protesisKeywords = [
      { kw: 'prótesis dentales viladecans', url: '/tratamientos/protesis-dentales-viladecans' },
      { kw: 'prótesis sobre implantes viladecans', url: '/tratamientos/protesis-dentales-viladecans' },
      { kw: 'dentadura postiza viladecans', url: '/tratamientos/protesis-dentales-viladecans' },
      { kw: 'coronas dentales viladecans', url: '/tratamientos/protesis-dentales-viladecans' },
      { kw: 'fundas dentales viladecans', url: '/tratamientos/protesis-dentales-viladecans' },
    ];

    protesisKeywords.forEach(({ kw, url }) => {
      keywords.push({
        keyword: kw,
        intent: 'transactional',
        targetUrl: `https://www.velasegalaviladecans.com${url}`,
        tags: ['prótesis', 'tratamientos'],
      });
    });

    // ===== CIRUGÍA ORAL =====
    const cirugiaKeywords = [
      { kw: 'cirugía oral viladecans', url: '/tratamientos/cirugia-oral-viladecans' },
      { kw: 'extracción muelas juicio viladecans', url: '/tratamientos/cirugia-oral-viladecans' },
      { kw: 'cirugía maxilofacial viladecans', url: '/tratamientos/cirugia-oral-viladecans' },
      { kw: 'injerto hueso dental viladecans', url: '/tratamientos/cirugia-oral-viladecans' },
      { kw: 'extracción dientes viladecans', url: '/tratamientos/cirugia-oral-viladecans' },
    ];

    cirugiaKeywords.forEach(({ kw, url }) => {
      keywords.push({
        keyword: kw,
        intent: 'transactional',
        targetUrl: `https://www.velasegalaviladecans.com${url}`,
        tags: ['cirugía', 'tratamientos'],
      });
    });

    // ===== BRUXISMO =====
    const bruxismoKeywords = [
      { kw: 'bruxismo viladecans', url: '/tratamientos/bruxismo-viladecans' },
      { kw: 'férula descarga viladecans', url: '/tratamientos/bruxismo-viladecans' },
      { kw: 'apretar dientes viladecans', url: '/tratamientos/bruxismo-viladecans' },
      { kw: 'tratamiento bruxismo viladecans', url: '/tratamientos/bruxismo-viladecans' },
      { kw: 'rechinamiento dientes viladecans', url: '/tratamientos/bruxismo-viladecans' },
    ];

    bruxismoKeywords.forEach(({ kw, url }) => {
      keywords.push({
        keyword: kw,
        intent: 'informational',
        targetUrl: `https://www.velasegalaviladecans.com${url}`,
        tags: ['bruxismo', 'tratamientos'],
      });
    });

    // ===== LIMPIEZA DENTAL =====
    const limpiezaKeywords = [
      { kw: 'limpieza dental viladecans', url: '/tratamientos/limpieza-dental-viladecans' },
      { kw: 'limpieza dental profesional viladecans', url: '/tratamientos/limpieza-dental-viladecans' },
      { kw: 'higiene dental viladecans', url: '/tratamientos/limpieza-dental-viladecans' },
      { kw: 'limpieza bucal viladecans', url: '/tratamientos/limpieza-dental-viladecans' },
      { kw: 'profilaxis dental viladecans', url: '/tratamientos/limpieza-dental-viladecans' },
    ];

    limpiezaKeywords.forEach(({ kw, url }) => {
      keywords.push({
        keyword: kw,
        intent: 'transactional',
        targetUrl: `https://www.velasegalaviladecans.com${url}`,
        tags: ['limpieza', 'tratamientos'],
      });
    });

    // ===== URGENCIAS DENTALES =====
    const urgenciasKeywords = [
      { kw: 'urgencias dentales viladecans', url: '/tratamientos/urgencias-dentales-viladecans' },
      { kw: 'dentista urgencias viladecans', url: '/tratamientos/urgencias-dentales-viladecans' },
      { kw: 'dolor muelas viladecans', url: '/tratamientos/urgencias-dentales-viladecans' },
      { kw: 'diente roto urgencia viladecans', url: '/tratamientos/urgencias-dentales-viladecans' },
      { kw: 'dentista 24 horas viladecans', url: '/tratamientos/urgencias-dentales-viladecans' },
    ];

    urgenciasKeywords.forEach(({ kw, url }) => {
      keywords.push({
        keyword: kw,
        intent: 'navigational',
        targetUrl: `https://www.velasegalaviladecans.com${url}`,
        tags: ['urgencias', 'tratamientos'],
      });
    });

    // ===== KEYWORDS SUGERIDAS ADICIONALES (BASADAS EN SEO) =====
    const suggestedKeywords = [
      // Keywords de búsqueda local
      { kw: 'mejor dentista viladecans', intent: 'informational', tags: ['local', 'general'] },
      { kw: 'dentista cerca de mi viladecans', intent: 'navigational', tags: ['local', 'general'] },
      { kw: 'clínica dental barata viladecans', intent: 'transactional', tags: ['precio', 'general'] },
      { kw: 'dentista recomendado viladecans', intent: 'informational', tags: ['reviews', 'general'] },
      
      // Keywords de implantes (adicionales)
      { kw: 'implantólogo viladecans', intent: 'transactional', tags: ['implantes', 'tratamientos'], url: '/tratamientos/implantes-dentales-viladecans' },
      { kw: 'carga inmediata implantes viladecans', intent: 'transactional', tags: ['implantes', 'tratamientos'], url: '/tratamientos/implantes-dentales-viladecans' },
      { kw: 'cirugía guiada implantes viladecans', intent: 'informational', tags: ['implantes', 'tratamientos'], url: '/tratamientos/implantes-dentales-viladecans' },
      
      // Keywords de ortodoncia (adicionales)
      { kw: 'ortodoncia lingual viladecans', intent: 'transactional', tags: ['ortodoncia', 'tratamientos'], url: '/tratamientos/ortodoncia-invisible-viladecans' },
      { kw: 'ortodoncia niños viladecans', intent: 'transactional', tags: ['ortodoncia', 'tratamientos'], url: '/tratamientos/ortodoncia-invisible-viladecans' },
      
      // Keywords de estética (adicionales)
      { kw: 'reconstrucción dental viladecans', intent: 'transactional', tags: ['estética', 'tratamientos'], url: '/tratamientos/estetica-dental-viladecans' },
      { kw: 'composite estético viladecans', intent: 'transactional', tags: ['estética', 'tratamientos'], url: '/tratamientos/estetica-dental-viladecans' },
      
      // Keywords generales adicionales
      { kw: 'tratamientos dentales viladecans', intent: 'informational', tags: ['general', 'tratamientos'], url: '/tratamientos' },
      { kw: 'primera visita gratuita viladecans', intent: 'transactional', tags: ['general', 'cita'], url: '/pedir-cita' },
      { kw: 'pedir cita dentista viladecans', intent: 'transactional', tags: ['general', 'cita'], url: '/pedir-cita' },
      { kw: 'dentista viladecans primera visita gratis', intent: 'transactional', tags: ['general', 'cita'], url: '/pedir-cita' },
    ];

    suggestedKeywords.forEach(({ kw, intent, tags, url }) => {
      keywords.push({
        keyword: kw,
        intent,
        targetUrl: url ? `https://www.velasegalaviladecans.com${url}` : undefined,
        tags,
      });
    });

    return keywords;
  }
}

