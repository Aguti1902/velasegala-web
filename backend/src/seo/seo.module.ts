import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { SeoController } from './seo.controller';
import { SeoService } from './seo.service';
import { GoogleSearchConsoleService } from './services/google-search-console.service';
import { KeywordVolumeService } from './services/keyword-volume.service';
import { SeoAuditService } from './services/seo-audit.service';
import { SeoRecommendationService } from './services/seo-recommendation.service';
import { SeoCronService } from './seo-cron.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [ConfigModule, ScheduleModule.forRoot(), PrismaModule],
  controllers: [SeoController],
  providers: [
    SeoService,
    GoogleSearchConsoleService,
    KeywordVolumeService,
    SeoAuditService,
    SeoRecommendationService,
    SeoCronService,
  ],
  exports: [SeoService],
})
export class SeoModule {}

