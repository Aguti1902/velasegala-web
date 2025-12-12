import { Controller, Get, Post, Patch, Delete, Param, Query, Body, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';

@Controller('appointments')
export class AppointmentsController {
  constructor(private prisma: PrismaService) {}

  // Public endpoint - No auth required
  @Post()
  async create(@Body() createAppointmentDto: CreateAppointmentDto) {
    return this.prisma.appointmentRequest.create({
      data: {
        name: createAppointmentDto.name,
        email: createAppointmentDto.email,
        phone: createAppointmentDto.phone,
        preferredDate: createAppointmentDto.preferredDate,
        preferredTime: createAppointmentDto.preferredTime,
        treatment: createAppointmentDto.treatment,
        message: createAppointmentDto.message,
        status: 'pending',
      },
    });
  }

  // Protected endpoints - Auth required
  @UseGuards(JwtAuthGuard)
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

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.prisma.appointmentRequest.findUnique({
      where: { id },
    });
  }

  @UseGuards(JwtAuthGuard)
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

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.prisma.appointmentRequest.delete({
      where: { id },
    });
  }

  @UseGuards(JwtAuthGuard)
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

