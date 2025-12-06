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
}

