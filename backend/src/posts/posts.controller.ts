import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PublishStatus } from '@prisma/client';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() createPostDto: CreatePostDto) {
    try {
      console.log('📥 Recibiendo petición para crear post:', {
        title: createPostDto.title,
        slug: createPostDto.slug,
        hasContent: !!createPostDto.content,
        categories: createPostDto.categories,
        tags: createPostDto.tags,
        publishStatus: createPostDto.publishStatus,
      });
      
      return await this.postsService.create(createPostDto);
    } catch (error) {
      console.error('❌ Error en el controlador al crear post:', error);
      throw error;
    }
  }

  @Get()
  findAll(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('status') status?: string,
    @Query('category') category?: string,
    @Query('tag') tag?: string,
    @Query('search') search?: string,
  ) {
    const pageNumber = page ? parseInt(page, 10) : 1;
    const limitNumber = limit ? parseInt(limit, 10) : 10;
    const skip = (pageNumber - 1) * limitNumber;

    const where: any = {};

    // Filtro por estado de publicación
    if (status && status !== 'ALL') {
      where.publishStatus = status;
      // Si es PUBLISHED, también filtrar por fecha
      if (status === 'PUBLISHED') {
        where.publishAt = { lte: new Date() };
      }
    } else if (!status) {
      // Por defecto solo mostrar publicados (para web pública)
      where.publishStatus = PublishStatus.PUBLISHED;
      where.publishAt = { lte: new Date() };
    }
    // Si status === 'ALL', no aplicar ningún filtro de estado

    // Filtro por categoría
    if (category) {
      where.categories = {
        some: {
          slug: category,
        },
      };
    }

    // Filtro por tag
    if (tag) {
      where.tags = {
        some: {
          slug: tag,
        },
      };
    }

    // Búsqueda por título o contenido
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { excerpt: { contains: search, mode: 'insensitive' } },
        { content: { contains: search, mode: 'insensitive' } },
      ];
    }

    return this.postsService.findAll({
      skip,
      take: limitNumber,
      where,
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(id);
  }

  @Get('slug/:slug')
  findBySlug(@Param('slug') slug: string) {
    return this.postsService.findBySlug(slug);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(id, updatePostDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.postsService.remove(id);
  }
}
