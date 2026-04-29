import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AnalyticsService } from './analytics.service';

@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAnalytics(@Query('days') days?: string) {
    const daysNum = days ? parseInt(days) : 7;
    return this.analyticsService.getAnalyticsData(daysNum);
  }

  @UseGuards(JwtAuthGuard)
  @Get('campaigns')
  async getCampaigns(@Query('days') days?: string) {
    const daysNum = days ? parseInt(days) : 30;
    return this.analyticsService.getCampaignData(daysNum);
  }
}

