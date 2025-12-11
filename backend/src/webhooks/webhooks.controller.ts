import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { WebhooksService } from './webhooks.service';
import { N8nBlogPostDto } from './dto/n8n-post.dto';
import { ApiKeyGuard } from '../auth/guards/api-key.guard';
import { PrismaService } from '../prisma/prisma.service';
import { PublishStatus } from '@prisma/client';

@Controller('webhooks')
export class WebhooksController {
  constructor(private readonly webhooksService: WebhooksService) {}

  @Post('n8n/blog-post')
  @UseGuards(ApiKeyGuard)
  async createPostFromN8n(@Body() n8nBlogPostDto: N8nBlogPostDto) {
    console.log('🔍 WEBHOOK RECIBIDO - Payload completo:', JSON.stringify(n8nBlogPostDto, null, 2));
    console.log('📸 featuredImageUrl:', n8nBlogPostDto.featuredImageUrl);
    console.log('📁 categories (type):', typeof n8nBlogPostDto.categories, '| value:', n8nBlogPostDto.categories);
    console.log('🏷️ tags (type):', typeof n8nBlogPostDto.tags, '| value:', n8nBlogPostDto.tags);
    
    return this.webhooksService.createPostFromN8n(n8nBlogPostDto);
  }
}
