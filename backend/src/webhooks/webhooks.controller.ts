import { Controller, Post, Patch, Param, Body, UseGuards } from '@nestjs/common';
import { WebhooksService } from './webhooks.service';
import { N8nBlogPostDto } from './dto/n8n-post.dto';
import { ApiKeyGuard } from '../auth/guards/api-key.guard';
import { PostsService } from '../posts/posts.service';
import { UpdatePostDto } from '../posts/dto/update-post.dto';

/**
 * Endpoints de automatización (agente de contenidos / n8n).
 * Autenticación: cabecera x-api-key = N8N_API_KEY
 */
@Controller('webhooks')
export class WebhooksController {
  constructor(
    private readonly webhooksService: WebhooksService,
    private readonly postsService: PostsService,
  ) {}

  @Post('n8n/blog-post')
  @UseGuards(ApiKeyGuard)
  async createPostFromN8n(@Body() n8nBlogPostDto: N8nBlogPostDto) {
    console.log('🔍 WEBHOOK RECIBIDO:', n8nBlogPostDto.title, '| publishAt:', n8nBlogPostDto.publishAt);
    return this.webhooksService.createPostFromN8n(n8nBlogPostDto);
  }

  /** Actualizar un artículo existente (imagen, metadatos, estado, contenido...) */
  @Patch('posts/:id')
  @UseGuards(ApiKeyGuard)
  async updatePost(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    console.log('✏️ WEBHOOK UPDATE post', id, Object.keys(updatePostDto));
    return this.postsService.update(id, updatePostDto);
  }
}
