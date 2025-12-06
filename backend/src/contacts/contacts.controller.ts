import { Controller, Get, Patch, Delete, Param, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PrismaService } from '../prisma/prisma.service';

@Controller('contacts')
@UseGuards(JwtAuthGuard)
export class ContactsController {
  constructor(private prisma: PrismaService) {}

  @Get()
  async findAll(
    @Query('page') page = '1',
    @Query('limit') limit = '20',
    @Query('status') status?: string,
  ) {
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    const where: any = {};
    if (status) {
      where.status = status;
    }

    const [data, total] = await Promise.all([
      this.prisma.contactSubmission.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        take: limitNum,
        skip,
      }),
      this.prisma.contactSubmission.count({ where }),
    ]);

    return {
      data,
      pagination: {
        total,
        page: pageNum,
        limit: limitNum,
        totalPages: Math.ceil(total / limitNum),
      },
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.prisma.contactSubmission.findUnique({
      where: { id },
    });
  }

  @Patch(':id/status')
  async updateStatus(
    @Param('id') id: string,
    @Query('status') status: string,
  ) {
    return this.prisma.contactSubmission.update({
      where: { id },
      data: { status },
    });
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.prisma.contactSubmission.delete({
      where: { id },
    });
  }

  @Get('stats/overview')
  async getStats() {
    const [total, pending, contacted, converted] = await Promise.all([
      this.prisma.contactSubmission.count(),
      this.prisma.contactSubmission.count({ where: { status: 'pending' } }),
      this.prisma.contactSubmission.count({ where: { status: 'contacted' } }),
      this.prisma.contactSubmission.count({ where: { status: 'converted' } }),
    ]);

    return {
      total,
      pending,
      contacted,
      converted,
      conversionRate: total > 0 ? ((converted / total) * 100).toFixed(2) : '0',
    };
  }
}

