import {
  BadRequestException,
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { IsOptional, IsString, Matches } from 'class-validator';
import type { Response } from 'express';
import { ApiKeyGuard } from '../auth/guards/api-key.guard';
import { PrismaService } from '../prisma/prisma.service';

const ALLOWED_MIME = ['image/webp', 'image/jpeg', 'image/png', 'image/avif'];
const MAX_BYTES = 5 * 1024 * 1024;

export class UploadMediaDto {
  /** Nombre legible para SEO, p.ej. "dolor-de-muelas-viladecans.webp" */
  @IsString()
  @Matches(/^[a-z0-9][a-z0-9-]*\.(webp|jpe?g|png|avif)$/)
  filename: string;

  @IsString()
  mimeType: string;

  /** Contenido del fichero en base64 (sin prefijo data:) */
  @IsString()
  data: string;

  @IsOptional()
  @IsString()
  alt?: string;
}

@Controller('media')
export class MediaController {
  constructor(private prisma: PrismaService) {}

  @Post()
  @UseGuards(ApiKeyGuard)
  async upload(@Body() dto: UploadMediaDto) {
    if (!ALLOWED_MIME.includes(dto.mimeType)) {
      throw new BadRequestException(`mimeType no permitido: ${dto.mimeType}`);
    }
    const buffer = Buffer.from(dto.data, 'base64');
    if (buffer.length === 0 || buffer.length > MAX_BYTES) {
      throw new BadRequestException(`Tamaño inválido (${buffer.length} bytes, máx ${MAX_BYTES})`);
    }

    const image = await this.prisma.blogImage.upsert({
      where: { filename: dto.filename },
      update: { data: buffer, mimeType: dto.mimeType, alt: dto.alt, size: buffer.length },
      create: {
        filename: dto.filename,
        data: buffer,
        mimeType: dto.mimeType,
        alt: dto.alt,
        size: buffer.length,
      },
      select: { id: true, filename: true, size: true },
    });

    return { ...image, path: `/media/${image.filename}` };
  }

  @Get(':filename')
  async serve(@Param('filename') filename: string, @Res() res: Response) {
    const image = await this.prisma.blogImage.findUnique({ where: { filename } });
    if (!image) {
      throw new NotFoundException('Imagen no encontrada');
    }
    res.setHeader('Content-Type', image.mimeType);
    res.setHeader('Content-Length', image.data.length.toString());
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
    res.end(Buffer.from(image.data));
  }
}
