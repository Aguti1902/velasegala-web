import { Controller, Post, UseGuards } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PublishStatus } from '@prisma/client';
import * as bcrypt from 'bcrypt';

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

  @Post('seed-database')
  async seedDatabase() {
    try {
      console.log('🌱 Iniciando seed desde admin endpoint...');

      // 1. Crear usuario admin
      const hashedPassword = await bcrypt.hash('Admin123!', 10);
      const admin = await this.prisma.user.upsert({
        where: { email: 'admin@velasegala.com' },
        update: {
          password: hashedPassword,
          name: 'Dr. Admin',
        },
        create: {
          email: 'admin@velasegala.com',
          name: 'Dr. Admin',
          password: hashedPassword,
          role: 'admin',
        },
      });
      console.log('✅ Usuario admin creado/actualizado');

      // 2. Actualizar fechas de posts futuros
      const updatedPosts = await this.prisma.post.updateMany({
        where: {
          publishStatus: PublishStatus.PUBLISHED,
          publishAt: { gt: new Date() },
        },
        data: {
          publishAt: new Date('2024-11-01'),
        },
      });
      console.log(`✅ ${updatedPosts.count} posts actualizados`);

      // 3. Verificar si ya hay datos
      const existingPostsCount = await this.prisma.post.count();
      if (existingPostsCount > 0) {
        return {
          message: 'La base de datos ya contiene posts. No se crean datos de ejemplo.',
          admin: admin.email,
          postsCount: existingPostsCount,
        };
      }

      console.log('🔄 Creando datos de ejemplo...');

      // 4. Crear tratamientos
      const tratamientos = await Promise.all([
        this.prisma.treatment.create({ data: { name: 'Implantes Dentales', slug: 'implantes-dentales' } }),
        this.prisma.treatment.create({ data: { name: 'Ortodoncia Invisible', slug: 'ortodoncia-invisible' } }),
        this.prisma.treatment.create({ data: { name: 'Blanqueamiento Dental', slug: 'blanqueamiento-dental' } }),
        this.prisma.treatment.create({ data: { name: 'Periodoncia', slug: 'periodoncia' } }),
      ]);
      console.log(`✅ ${tratamientos.length} tratamientos creados`);

      // 5. Crear categorías
      const categorias = await Promise.all([
        this.prisma.category.create({ data: { name: 'Salud Bucodental', slug: 'salud-bucodental' } }),
        this.prisma.category.create({ data: { name: 'Tratamientos', slug: 'tratamientos' } }),
        this.prisma.category.create({ data: { name: 'Cuidados', slug: 'cuidados' } }),
        this.prisma.category.create({ data: { name: 'Prevención', slug: 'prevencion' } }),
      ]);
      console.log(`✅ ${categorias.length} categorías creadas`);

      // 6. Crear tags
      const tags = await Promise.all([
        this.prisma.tag.create({ data: { name: 'Consejos', slug: 'consejos' } }),
        this.prisma.tag.create({ data: { name: 'Implantes', slug: 'implantes' } }),
        this.prisma.tag.create({ data: { name: 'Ortodoncia', slug: 'ortodoncia' } }),
        this.prisma.tag.create({ data: { name: 'Viladecans', slug: 'viladecans' } }),
      ]);
      console.log(`✅ ${tags.length} tags creados`);

      // 7. Crear posts de ejemplo
      const posts = await Promise.all([
        this.prisma.post.create({
          data: {
            title: 'Primera Visita al Dentista en Viladecans: Qué Esperar y Cómo Prepararte',
            slug: 'primera-visita-dentista-viladecans',
            content: 'La primera visita al dentista es un momento importante...',
            excerpt: 'Descubre qué esperar en tu primera visita al dentista en Viladecans.',
            featuredImage: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5',
            publishStatus: PublishStatus.PUBLISHED,
            publishAt: new Date('2024-11-15'),
            metaTitle: 'Primera Visita al Dentista en Viladecans | Clínica Vela-Segalà',
            metaDescription: 'Guía completa para tu primera visita al dentista en Viladecans.',
            categories: { connect: [{ id: categorias[0].id }, { id: categorias[3].id }] },
            tags: { connect: [{ id: tags[0].id }, { id: tags[3].id }] },
          },
        }),
        this.prisma.post.create({
          data: {
            title: 'Precio de Implantes Dentales en Viladecans: Factores que Influyen',
            slug: 'precio-implantes-dentales-viladecans',
            content: 'Los implantes dentales son una solución permanente...',
            excerpt: 'Conoce los factores que determinan el precio de los implantes dentales.',
            featuredImage: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95',
            publishStatus: PublishStatus.PUBLISHED,
            publishAt: new Date('2024-11-20'),
            metaTitle: 'Precio Implantes Dentales Viladecans | Clínica Vela-Segalà',
            metaDescription: 'Descubre los precios y factores de los implantes dentales en Viladecans.',
            categories: { connect: [{ id: categorias[1].id }] },
            tags: { connect: [{ id: tags[1].id }, { id: tags[3].id }] },
          },
        }),
        this.prisma.post.create({
          data: {
            title: 'Ortodoncia Invisible en Viladecans: Ventajas, Duración y Cuidados',
            slug: 'ortodoncia-invisible-viladecans',
            content: 'La ortodoncia invisible ha revolucionado el mundo de la odontología...',
            excerpt: 'Todo lo que necesitas saber sobre la ortodoncia invisible.',
            featuredImage: 'https://images.unsplash.com/photo-1609137144813-7d9921338f24',
            publishStatus: PublishStatus.PUBLISHED,
            publishAt: new Date('2024-11-25'),
            metaTitle: 'Ortodoncia Invisible Viladecans | Clínica Vela-Segalà',
            metaDescription: 'Descubre las ventajas de la ortodoncia invisible en Viladecans.',
            categories: { connect: [{ id: categorias[1].id }, { id: categorias[2].id }] },
            tags: { connect: [{ id: tags[2].id }, { id: tags[3].id }] },
          },
        }),
      ]);
      console.log(`✅ ${posts.length} posts creados`);

      return {
        message: '🎉 Base de datos poblada exitosamente',
        admin: admin.email,
        data: {
          treatments: tratamientos.length,
          categories: categorias.length,
          tags: tags.length,
          posts: posts.length,
        },
      };
    } catch (error) {
      console.error('❌ Error en seed:', error);
      return {
        error: 'Error al poblar la base de datos',
        details: error.message,
      };
    }
  }
}

