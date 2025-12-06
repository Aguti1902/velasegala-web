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
    return this.webhooksService.createPostFromN8n(n8nBlogPostDto);
  }
}
