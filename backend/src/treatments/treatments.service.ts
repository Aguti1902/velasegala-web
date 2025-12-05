import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TreatmentsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.treatment.findMany({
      where: { published: true },
      orderBy: { order: 'asc' },
    });
  }

  async findBySlug(slug: string) {
    return this.prisma.treatment.findUnique({
      where: { slug },
    });
  }
}


