import { Controller, Get, Patch, Delete, Param, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PrismaService } from '../prisma/prisma.service';

@Controller('appointments')
@UseGuards(JwtAuthGuard)
export class AppointmentsController {
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
      this.prisma.appointmentRequest.findMany({
        where,
        orderBy: { preferredDate: 'asc' },
        take: limitNum,
        skip,
      }),
      this.prisma.appointmentRequest.count({ where }),
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
    return this.prisma.appointmentRequest.findUnique({
      where: { id },
    });
  }

  @Patch(':id/status')
  async updateStatus(
    @Param('id') id: string,
    @Query('status') status: string,
  ) {
    return this.prisma.appointmentRequest.update({
      where: { id },
      data: { status },
    });
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.prisma.appointmentRequest.delete({
      where: { id },
    });
  }

  @Get('stats/overview')
  async getStats() {
    const [total, pending, confirmed, completed] = await Promise.all([
      this.prisma.appointmentRequest.count(),
      this.prisma.appointmentRequest.count({ where: { status: 'pending' } }),
      this.prisma.appointmentRequest.count({ where: { status: 'confirmed' } }),
      this.prisma.appointmentRequest.count({ where: { status: 'completed' } }),
    ]);

    return {
      total,
      pending,
      confirmed,
      completed,
    };
  }
}

