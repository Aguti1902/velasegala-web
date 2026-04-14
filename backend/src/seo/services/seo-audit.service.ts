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

    // ── Guardar/actualizar issues detectados ──
    const detectedKeys = new Set<string>();

    for (const issue of issues) {
      const key = `${issue.type}|${issue.title}|${issue.url || ''}`;
      detectedKeys.add(key);

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
            description: issue.description,
            evidenceJson: issue.evidence || {},
            lastSeen: new Date(),
            status: 'open',          // Reabrirlo si estaba descartado
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

    // ── Auto-resolver issues que ya NO se detectan ──
    const openIssues = await this.prisma.seoIssue.findMany({
      where: { siteId, status: 'open' },
    });

    for (const openIssue of openIssues) {
      const key = `${openIssue.type}|${openIssue.title}|${openIssue.url || ''}`;
      if (!detectedKeys.has(key)) {
        await this.prisma.seoIssue.update({
          where: { id: openIssue.id },
          data: { status: 'resolved' },
        });
        this.logger.log(`✅ Issue resuelto automáticamente: ${openIssue.title}`);
      }
    }

    this.logger.log(`✅ Auditoría completada: ${issues.length} issues encontrados`);

    return { issuesFound: issues.length };
  }

  private async checkSitemap(baseUrl: string): Promise<any[]> {
    const issues: any[] = [];
    const sitemapUrl = `${baseUrl}/sitemap.xml`;

    try {
      const response = await axios.get(sitemapUrl, { timeout: 20000 });
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
      // Si llega aquí sin lanzar error → sitemap OK, no añadimos issue
    } catch (error: any) {
      const isTimeout = error.code === 'ECONNABORTED' || error.message?.includes('timeout');
      issues.push({
        type: 'technical',
        severity: 'high',
        url: sitemapUrl,
        title: 'Sitemap no encontrado',
        description: isTimeout
          ? `El sitemap tardó demasiado en responder (timeout). Puede deberse a un arranque en frío del servidor.`
          : `No se pudo acceder al sitemap en ${sitemapUrl}`,
        evidence: { error: error?.message || String(error) },
      });
    }

    return issues;
  }

  private async checkRobots(baseUrl: string): Promise<any[]> {
    const issues: any[] = [];
    const robotsUrl = `${baseUrl}/robots.txt`;

    try {
      const response = await axios.get(robotsUrl, { timeout: 20000 });
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
      // Si llega aquí → robots OK
    } catch (error: any) {
      const isTimeout = error.code === 'ECONNABORTED' || error.message?.includes('timeout');
      issues.push({
        type: 'technical',
        severity: 'medium',
        url: robotsUrl,
        title: 'Robots.txt no encontrado',
        description: isTimeout
          ? `El robots.txt tardó demasiado en responder (timeout).`
          : `No se pudo acceder al robots.txt en ${robotsUrl}`,
        evidence: { error: error?.message || String(error) },
      });
    }

    return issues;
  }

  private async fetchWithRetry(url: string, timeoutMs: number, retries = 2): Promise<any> {
    let lastError: any;
    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        const response = await axios.get(url, {
          timeout: timeoutMs,
          validateStatus: (status) => status < 500,
          headers: {
            'User-Agent': 'VelaSegala-SEO-Audit/1.0',
          },
        });
        return response;
      } catch (err: any) {
        lastError = err;
        const isTimeout = err.code === 'ECONNABORTED' || err.message?.includes('timeout');
        if (isTimeout && attempt < retries) {
          this.logger.warn(`Timeout en ${url}, reintentando (${attempt}/${retries})...`);
          await new Promise(r => setTimeout(r, 3000));
        } else {
          throw err;
        }
      }
    }
    throw lastError;
  }

  private async auditPage(url: string): Promise<any[]> {
    const issues: any[] = [];

    try {
      const response = await this.fetchWithRetry(url, 30000, 2);

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
          description: `El title tag tiene ${title?.length || 0} caracteres (recomendado: 30-60). Contenido: "${title}"`,
          evidence: { title, length: title?.length || 0 },
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

      // Verificar H1
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
      const isTimeout = error.code === 'ECONNABORTED' || error.message?.includes('timeout');
      // Solo registrar como issue si NO es timeout (el timeout es normal en Vercel cold start)
      if (!isTimeout) {
        issues.push({
          type: 'technical',
          severity: 'critical',
          url,
          title: 'Error al auditar página',
          description: `No se pudo auditar la página: ${error.message}`,
          evidence: { error: error.message },
        });
      } else {
        this.logger.warn(`⏱️ Timeout al auditar ${url} (normal en cold start de Vercel - no se registra como issue)`);
      }
    }

    return issues;
  }
}
