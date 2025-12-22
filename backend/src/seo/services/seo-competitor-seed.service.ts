import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class SeoCompetitorSeedService {
  private readonly logger = new Logger(SeoCompetitorSeedService.name);

  constructor(private prisma: PrismaService) {}

  /**
   * Añade competidores predefinidos para un sitio
   */
  async seedCompetitors(siteId: string) {
    const competitors = [
      {
        domain: 'clinicadentalbaldrich.es',
        name: 'Clínica Dental Baldrich',
        url: 'https://www.clinicadentalbaldrich.es/',
      },
      {
        domain: 'clinicadiezmarieges.com',
        name: 'Clínica Dental Díez Marieges',
        url: 'https://clinicadiezmarieges.com/',
      },
      {
        domain: 'sanitas.es',
        name: 'Sanitas Dental - Milenium Viladecans',
        url: 'https://www.sanitas.es/dental/clinicas-dentales-milenium/barcelona/viladecans/viladecans',
      },
      {
        domain: 'dentistaviladecans.com',
        name: 'Dentista Viladecans',
        url: 'https://dentistaviladecans.com/',
      },
      {
        domain: 'ballesterclinicadental.com',
        name: 'Ballester Clínica Dental',
        url: 'https://ballesterclinicadental.com/',
      },
      {
        domain: 'clinicadentalbeyer.com',
        name: 'Clínica Dental Beyer',
        url: 'https://www.clinicadentalbeyer.com/',
      },
      {
        domain: 'dental-clinics.es',
        name: 'Dental Clinics',
        url: 'https://www.dental-clinics.es/',
      },
      {
        domain: 'centromedicomeisa.com',
        name: 'Centro Médico Meisa - Odontología',
        url: 'https://www.centromedicomeisa.com/odontologia/',
      },
      {
        domain: 'clinicapuigdemasa.com',
        name: 'Clínica Puigdemasa',
        url: 'https://www.clinicapuigdemasa.com/es/clinica-dental/',
      },
      {
        domain: 'dentalmilenari.es',
        name: 'Dental Milenari',
        url: 'https://dentalmilenari.es/',
      },
      {
        domain: 'densanadental.es',
        name: 'Densana Dental',
        url: 'https://densanadental.es/',
      },
    ];

    let created = 0;
    let skipped = 0;

    for (const competitor of competitors) {
      try {
        await this.prisma.seoCompetitor.upsert({
          where: {
            siteId_domain: {
              siteId,
              domain: competitor.domain,
            },
          },
          update: {
            name: competitor.name,
            url: competitor.url,
            enabled: true,
          },
          create: {
            siteId,
            domain: competitor.domain,
            name: competitor.name,
            url: competitor.url,
            enabled: true,
          },
        });
        created++;
        this.logger.log(`✅ Competidor añadido: ${competitor.domain}`);
      } catch (error: any) {
        this.logger.warn(
          `Error al añadir competidor ${competitor.domain}:`,
          error.message,
        );
        skipped++;
      }
    }

    this.logger.log(
      `✅ Seed de competidores completado: ${created} creados/actualizados, ${skipped} fallidos`,
    );

    return { created, skipped };
  }
}

