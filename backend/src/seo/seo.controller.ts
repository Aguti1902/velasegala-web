import {
  Controller,
  Get,
  Post,
  Put,
  Param,
  Query,
  Body,
  UseGuards,
  ParseIntPipe,
  DefaultValuePipe,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { SeoService } from './seo.service';
import { SeoCronService } from './seo-cron.service';

@Controller('seo')
@UseGuards(JwtAuthGuard)
export class SeoController {
  constructor(
    private seoService: SeoService,
    private cronService: SeoCronService,
  ) {}

  // ===== SITES =====

  @Get('sites')
  async getSites() {
    return this.seoService.getSites();
  }

  @Get('sites/:id')
  async getSite(@Param('id') id: string) {
    return this.seoService.getSite(id);
  }

  @Post('sites')
  async createSite(@Body() data: { domain: string; gscProperty?: string; countryDefault?: string }) {
    return this.seoService.createSite(data);
  }

  @Put('sites/:id')
  async updateSite(
    @Param('id') id: string,
    @Body() data: Partial<{ domain: string; gscProperty: string; countryDefault: string }>,
  ) {
    return this.seoService.updateSite(id, data);
  }

  // ===== OVERVIEW =====

  @Get('sites/:siteId/overview')
  async getOverview(
    @Param('siteId') siteId: string,
    @Query('days', new DefaultValuePipe(28), ParseIntPipe) days: number,
  ) {
    return this.seoService.getOverview(siteId, days);
  }

  // ===== KEYWORDS =====

  @Get('sites/:siteId/keywords')
  async getKeywords(
    @Param('siteId') siteId: string,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(50), ParseIntPipe) limit: number,
    @Query('country') country?: string,
    @Query('device') device?: string,
    @Query('search') search?: string,
    @Query('minPosition') minPosition?: string,
    @Query('maxPosition') maxPosition?: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ) {
    return this.seoService.getKeywords(
      siteId,
      {
        country,
        device,
        search,
        minPosition: minPosition ? parseInt(minPosition) : undefined,
        maxPosition: maxPosition ? parseInt(maxPosition) : undefined,
        startDate: startDate ? new Date(startDate) : undefined,
        endDate: endDate ? new Date(endDate) : undefined,
      },
      page,
      limit,
    );
  }

  @Get('keywords/:keywordId/history')
  async getKeywordHistory(
    @Param('keywordId') keywordId: string,
    @Query('days', new DefaultValuePipe(30), ParseIntPipe) days: number,
  ) {
    return this.seoService.getKeywordHistory(keywordId, days);
  }

  // ===== OPPORTUNITIES =====

  @Get('sites/:siteId/opportunities')
  async getOpportunities(@Param('siteId') siteId: string) {
    return this.seoService.getOpportunities(siteId);
  }

  // ===== TECHNICAL SEO =====

  @Get('sites/:siteId/technical')
  async getTechnicalSeo(@Param('siteId') siteId: string) {
    return this.seoService.getTechnicalSeo(siteId);
  }

  // ===== RECOMMENDATIONS =====

  @Get('sites/:siteId/recommendations')
  async getRecommendations(@Param('siteId') siteId: string) {
    return this.seoService.getRecommendations(siteId);
  }

  @Put('recommendations/:id/status')
  async updateRecommendationStatus(
    @Param('id') id: string,
    @Body() data: { status: 'pending' | 'in_progress' | 'completed' | 'dismissed' },
  ) {
    return this.seoService.updateRecommendationStatus(id, data.status);
  }

  // ===== MANUAL SYNC =====

  @Post('sync')
  async manualSync(@Body() data?: { siteId?: string }) {
    return this.cronService.runManualSync(data?.siteId);
  }

  @Post('sites/:siteId/import-keywords')
  async importKeywords(@Param('siteId') siteId: string) {
    return this.seoService.importKeywordsFromWebsite(siteId);
  }

  @Post('sites/:siteId/discover-keywords')
  async discoverKeywords(
    @Param('siteId') siteId: string,
    @Query('minVolume') minVolume?: string,
  ) {
    const minVol = minVolume ? parseInt(minVolume) : 100;
    return this.seoService.discoverKeywords(siteId, minVol);
  }

  // ===== COMPETITORS =====

  @Get('sites/:siteId/competitors')
  async getCompetitors(@Param('siteId') siteId: string) {
    return this.seoService.getCompetitors(siteId);
  }

  @Post('sites/:siteId/competitors')
  async createCompetitor(
    @Param('siteId') siteId: string,
    @Body() data: { domain: string; name?: string; url: string },
  ) {
    return this.seoService.createCompetitor(siteId, data);
  }

  @Put('competitors/:id')
  async updateCompetitor(
    @Param('id') id: string,
    @Body() data: Partial<{ name: string; url: string; enabled: boolean }>,
  ) {
    return this.seoService.updateCompetitor(id, data);
  }

  @Delete('competitors/:id')
  async deleteCompetitor(@Param('id') id: string) {
    return this.seoService.deleteCompetitor(id);
  }

  @Post('competitors/:id/analyze')
  async analyzeCompetitor(@Param('id') id: string) {
    return this.seoService.analyzeCompetitor(id);
  }

  @Get('sites/:siteId/competitors/compare')
  async compareWithCompetitors(@Param('siteId') siteId: string) {
    return this.seoService.compareWithCompetitors(siteId);
  }

  @Get('competitors/:id/keywords')
  async getCompetitorKeywords(
    @Param('id') id: string,
    @Query('limit', new DefaultValuePipe(100), ParseIntPipe) limit: number,
  ) {
    return this.seoService.getCompetitorKeywords(id, limit);
  }

  @Post('sites/:siteId/competitors/seed')
  async seedCompetitors(@Param('siteId') siteId: string) {
    return this.seoService.seedCompetitors(siteId);
  }
}

