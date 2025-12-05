import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Prisma, PublishStatus } from '@prisma/client';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  async create(createPostDto: CreatePostDto) {
    const { categories, tags, ...postData } = createPostDto;

    // Verificar si el slug ya existe
    const existingPost = await this.prisma.post.findUnique({
      where: { slug: postData.slug },
    });

    if (existingPost) {
      throw new BadRequestException(`Post with slug "${postData.slug}" already exists`);
    }

    // Crear o conectar categorías
    const categoryConnections = categories
      ? await Promise.all(
          categories.map(async (categoryName) => {
            const category = await this.prisma.category.upsert({
              where: { slug: this.slugify(categoryName) },
              update: {},
              create: {
                name: categoryName,
                slug: this.slugify(categoryName),
              },
            });
            return { id: category.id };
          })
        )
      : [];

    // Crear o conectar tags
    const tagConnections = tags
      ? await Promise.all(
          tags.map(async (tagName) => {
            const tag = await this.prisma.tag.upsert({
              where: { slug: this.slugify(tagName) },
              update: {},
              create: {
                name: tagName,
                slug: this.slugify(tagName),
              },
            });
            return { id: tag.id };
          })
        )
      : [];

    return this.prisma.post.create({
      data: {
        ...postData,
        categories: {
          connect: categoryConnections,
        },
        tags: {
          connect: tagConnections,
        },
      },
      include: {
        categories: true,
        tags: true,
        author: true,
      },
    });
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    where?: Prisma.PostWhereInput;
    orderBy?: Prisma.PostOrderByWithRelationInput;
  }) {
    const { skip, take, where, orderBy } = params;

    const [posts, total] = await Promise.all([
      this.prisma.post.findMany({
        skip,
        take,
        where,
        orderBy: orderBy || { publishAt: 'desc' },
        include: {
          categories: true,
          tags: true,
          author: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      }),
      this.prisma.post.count({ where }),
    ]);

    return {
      data: posts,
      pagination: {
        total,
        page: skip ? Math.floor(skip / (take || 10)) + 1 : 1,
        limit: take || 10,
        totalPages: Math.ceil(total / (take || 10)),
      },
    };
  }

  async findOne(id: string) {
    const post = await this.prisma.post.findUnique({
      where: { id },
      include: {
        categories: true,
        tags: true,
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    if (!post) {
      throw new NotFoundException(`Post with ID "${id}" not found`);
    }

    return post;
  }

  async findBySlug(slug: string) {
    const post = await this.prisma.post.findUnique({
      where: { slug },
      include: {
        categories: true,
        tags: true,
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    if (!post) {
      throw new NotFoundException(`Post with slug "${slug}" not found`);
    }

    return post;
  }

  async update(id: string, updatePostDto: UpdatePostDto) {
    const { categories, tags, ...postData } = updatePostDto;

    // Verificar que el post existe
    await this.findOne(id);

    // Si hay un nuevo slug, verificar que no exista
    if (postData.slug) {
      const existingPost = await this.prisma.post.findUnique({
        where: { slug: postData.slug },
      });

      if (existingPost && existingPost.id !== id) {
        throw new BadRequestException(`Post with slug "${postData.slug}" already exists`);
      }
    }

    // Preparar conexiones de categorías
    let categoryConnections;
    if (categories) {
      categoryConnections = await Promise.all(
        categories.map(async (categoryName) => {
          const category = await this.prisma.category.upsert({
            where: { slug: this.slugify(categoryName) },
            update: {},
            create: {
              name: categoryName,
              slug: this.slugify(categoryName),
            },
          });
          return { id: category.id };
        })
      );
    }

    // Preparar conexiones de tags
    let tagConnections;
    if (tags) {
      tagConnections = await Promise.all(
        tags.map(async (tagName) => {
          const tag = await this.prisma.tag.upsert({
            where: { slug: this.slugify(tagName) },
            update: {},
            create: {
              name: tagName,
              slug: this.slugify(tagName),
            },
          });
          return { id: tag.id };
        })
      );
    }

    return this.prisma.post.update({
      where: { id },
      data: {
        ...postData,
        ...(categoryConnections && {
          categories: {
            set: [],
            connect: categoryConnections,
          },
        }),
        ...(tagConnections && {
          tags: {
            set: [],
            connect: tagConnections,
          },
        }),
      },
      include: {
        categories: true,
        tags: true,
        author: true,
      },
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.post.delete({
      where: { id },
    });
  }

  // Método para crear post desde n8n
  async createFromN8n(data: any) {
    const {
      title,
      slug,
      content,
      excerpt,
      featuredImageUrl,
      categories,
      tags,
      metaTitle,
      metaDescription,
      publishStatus,
      publishAt,
    } = data;

    return this.create({
      title,
      slug,
      content,
      excerpt,
      featuredImage: featuredImageUrl,
      metaTitle,
      metaDescription,
      publishStatus: publishStatus || PublishStatus.DRAFT,
      publishAt: publishAt ? new Date(publishAt) : undefined,
      categories,
      tags,
    });
  }

  // Utilidad para crear slugs
  private slugify(text: string): string {
    return text
      .toString()
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^\w\-]+/g, '')
      .replace(/\-\-+/g, '-');
  }
}
