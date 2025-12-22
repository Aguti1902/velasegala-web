import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import * as cheerio from 'cheerio';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class SeoAuditService {
  private readonly logger = new Logger(SeoAuditService.name);

  constructor(
    private configService: ConfigService,
    private prisma: PrismaService,
  ) {}

  async auditSite(siteId: string, baseUrl: string) {
    this.logger.log(`Iniciando auditoría SEO para ${baseUrl}`);

    const issues: any[] = [];

    // 1. Verificar sitemap
    const sitemapIssues = await this.checkSitemap(baseUrl);
    issues.push(...sitemapIssues);

    // 2. Verificar robots.txt
    const robotsIssues = await this.checkRobots(baseUrl);
    issues.push(...robotsIssues);

    // 3. Verificar páginas principales
    const pagesToCheck = [
      '/',
      '/contacto',
      '/pedir-cita',
      '/blog',
      '/tratamientos',
    ];

    for (const path of pagesToCheck) {
      const url = `${baseUrl}${path}`;
      const pageIssues = await this.auditPage(url);
      issues.push(...pageIssues);
    }

    // Guardar issues en BD
    for (const issue of issues) {
      // Buscar issue existente
      const existing = await this.prisma.seoIssue.findFirst({
        where: {
          siteId,
          type: issue.type,
          url: issue.url || null,
          title: issue.title,
        },
      });

      if (existing) {
        await this.prisma.seoIssue.update({
          where: { id: existing.id },
          data: {
            severity: issue.severity,
            title: issue.title,
            description: issue.description,
            evidenceJson: issue.evidence || {},
            lastSeen: new Date(),
          },
        });
      } else {
        await this.prisma.seoIssue.create({
          data: {
            siteId,
            type: issue.type,
            severity: issue.severity,
            url: issue.url,
            title: issue.title,
            description: issue.description,
            evidenceJson: issue.evidence || {},
            status: 'open',
          },
        });
      }
    }

    this.logger.log(`✅ Auditoría completada: ${issues.length} issues encontrados`);

    return { issuesFound: issues.length };
  }

  private async checkSitemap(baseUrl: string): Promise<any[]> {
    const issues: any[] = [];
    const sitemapUrl = `${baseUrl}/sitemap.xml`;

    try {
      const response = await axios.get(sitemapUrl, { timeout: 5000 });
      if (response.status !== 200) {
        issues.push({
          type: 'technical',
          severity: 'high',
          url: sitemapUrl,
          title: 'Sitemap no accesible',
          description: `El sitemap en ${sitemapUrl} no es accesible (status: ${response.status})`,
          evidence: { status: response.status },
        });
      }
    } catch (error: any) {
      issues.push({
        type: 'technical',
        severity: 'high',
        url: sitemapUrl,
        title: 'Sitemap no encontrado',
        description: `No se pudo acceder al sitemap en ${sitemapUrl}`,
        evidence: { error: error?.message || String(error) },
      });
    }

    return issues;
  }

  private async checkRobots(baseUrl: string): Promise<any[]> {
    const issues: any[] = [];
    const robotsUrl = `${baseUrl}/robots.txt`;

    try {
      const response = await axios.get(robotsUrl, { timeout: 5000 });
      if (response.status !== 200) {
        issues.push({
          type: 'technical',
          severity: 'medium',
          url: robotsUrl,
          title: 'Robots.txt no accesible',
          description: `El robots.txt en ${robotsUrl} no es accesible`,
          evidence: { status: response.status },
        });
      }
    } catch (error: any) {
      issues.push({
        type: 'technical',
        severity: 'medium',
        url: robotsUrl,
        title: 'Robots.txt no encontrado',
        description: `No se pudo acceder al robots.txt en ${robotsUrl}`,
        evidence: { error: error?.message || String(error) },
      });
    }

    return issues;
  }

  private async auditPage(url: string): Promise<any[]> {
    const issues: any[] = [];

    try {
      const response = await axios.get(url, {
        timeout: 10000,
        validateStatus: (status) => status < 500,
      });

      if (response.status >= 400) {
        issues.push({
          type: 'technical',
          severity: response.status >= 500 ? 'critical' : 'high',
          url,
          title: `Error HTTP ${response.status}`,
          description: `La página retorna un error HTTP ${response.status}`,
          evidence: { status: response.status },
        });
        return issues;
      }

      const $ = cheerio.load(response.data);

      // Verificar title
      const title = $('title').text();
      if (!title || title.length < 30 || title.length > 60) {
        issues.push({
          type: 'content',
          severity: 'medium',
          url,
          title: 'Title tag no optimizado',
          description: `El title tag tiene ${title.length} caracteres (recomendado: 30-60)`,
          evidence: { title, length: title.length },
        });
      }

      // Verificar meta description
      const metaDesc = $('meta[name="description"]').attr('content');
      if (!metaDesc || metaDesc.length < 120 || metaDesc.length > 160) {
        issues.push({
          type: 'content',
          severity: 'medium',
          url,
          title: 'Meta description no optimizada',
          description: `La meta description tiene ${metaDesc?.length || 0} caracteres (recomendado: 120-160)`,
          evidence: { metaDescription: metaDesc, length: metaDesc?.length || 0 },
        });
      }

      // Verificar headings
      const h1Count = $('h1').length;
      if (h1Count === 0) {
        issues.push({
          type: 'content',
          severity: 'high',
          url,
          title: 'Falta H1',
          description: 'La página no tiene un tag H1',
          evidence: {},
        });
      } else if (h1Count > 1) {
        issues.push({
          type: 'content',
          severity: 'medium',
          url,
          title: 'Múltiples H1',
          description: `La página tiene ${h1Count} tags H1 (recomendado: 1)`,
          evidence: { h1Count },
        });
      }

      // Verificar canonical
      const canonical = $('link[rel="canonical"]').attr('href');
      if (!canonical) {
        issues.push({
          type: 'technical',
          severity: 'medium',
          url,
          title: 'Falta canonical tag',
          description: 'La página no tiene un tag canonical',
          evidence: {},
        });
      }

      // Verificar schema markup
      const schema = $('script[type="application/ld+json"]');
      if (schema.length === 0) {
        issues.push({
          type: 'content',
          severity: 'low',
          url,
          title: 'Falta schema markup',
          description: 'La página no tiene schema markup JSON-LD',
          evidence: {},
        });
      }

      // Verificar imágenes sin alt
      const imagesWithoutAlt = $('img:not([alt])').length;
      if (imagesWithoutAlt > 0) {
        issues.push({
          type: 'content',
          severity: 'medium',
          url,
          title: 'Imágenes sin alt text',
          description: `${imagesWithoutAlt} imágenes no tienen atributo alt`,
          evidence: { count: imagesWithoutAlt },
        });
      }
    } catch (error: any) {
      issues.push({
        type: 'technical',
        severity: 'critical',
        url,
        title: 'Error al auditar página',
        description: `No se pudo auditar la página: ${error.message}`,
        evidence: { error: error.message },
      });
    }

    return issues;
  }
}

