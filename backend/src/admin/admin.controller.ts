import { Controller, Post, UseGuards } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PublishStatus } from '@prisma/client';

@Controller('admin')
@UseGuards(JwtAuthGuard)
export class AdminController {
  constructor(private prisma: PrismaService) {}

  @Post('fix-post-dates')
  async fixPostDates() {
    // Actualizar fechas de posts con fechas futuras
    const updated = await this.prisma.post.updateMany({
      where: {
        publishStatus: PublishStatus.PUBLISHED,
        publishAt: {
          gt: new Date(),
        },
      },
      data: {
        publishAt: new Date('2024-11-01'),
      },
    });

    return {
      message: `Se actualizaron ${updated.count} posts`,
      count: updated.count,
    };
  }

  @Post('delete-old-posts')
  async deleteOldPosts() {
    // Obtener el post más reciente
    const latestPost = await this.prisma.post.findFirst({
      orderBy: { createdAt: 'desc' },
      select: { id: true, title: true, createdAt: true },
    });

    if (!latestPost) {
      return {
        message: 'No hay posts en la base de datos',
        deleted: 0,
      };
    }

    // Eliminar todos los posts excepto el más reciente
    const deleted = await this.prisma.post.deleteMany({
      where: {
        id: {
          not: latestPost.id,
        },
      },
    });

    return {
      message: `Se eliminaron ${deleted.count} posts`,
      deleted: deleted.count,
      kept: {
        id: latestPost.id,
        title: latestPost.title,
        createdAt: latestPost.createdAt,
      },
    };
  }
}

