import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TagsService {
  constructor(private prisma: PrismaService) {}

  async create(data: { name: string; slug: string }) {
    const existingTag = await this.prisma.tag.findUnique({
      where: { slug: data.slug },
    });

    if (existingTag) {
      throw new BadRequestException(`Tag with slug "${data.slug}" already exists`);
    }

    return this.prisma.tag.create({
      data,
      include: {
        _count: {
          select: { posts: true },
        },
      },
    });
  }

  async findAll() {
    return this.prisma.tag.findMany({
      include: {
        _count: {
          select: { posts: true },
        },
      },
      orderBy: {
        name: 'asc',
      },
    });
  }

  async findOne(id: string) {
    const tag = await this.prisma.tag.findUnique({
      where: { id },
      include: {
        _count: {
          select: { posts: true },
        },
      },
    });

    if (!tag) {
      throw new NotFoundException(`Tag with ID "${id}" not found`);
    }

    return tag;
  }

  async findBySlug(slug: string) {
    const tag = await this.prisma.tag.findUnique({
      where: { slug },
      include: {
        _count: {
          select: { posts: true },
        },
      },
    });

    if (!tag) {
      throw new NotFoundException(`Tag with slug "${slug}" not found`);
    }

    return tag;
  }

  async update(id: string, data: { name?: string; slug?: string }) {
    await this.findOne(id);

    if (data.slug) {
      const existingTag = await this.prisma.tag.findUnique({
        where: { slug: data.slug },
      });

      if (existingTag && existingTag.id !== id) {
        throw new BadRequestException(`Tag with slug "${data.slug}" already exists`);
      }
    }

    return this.prisma.tag.update({
      where: { id },
      data,
      include: {
        _count: {
          select: { posts: true },
        },
      },
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.tag.delete({
      where: { id },
    });
  }
}
