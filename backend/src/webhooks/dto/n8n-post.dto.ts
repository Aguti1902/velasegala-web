import {
  IsString,
  IsOptional,
  IsArray,
  IsEnum,
  IsDateString,
} from 'class-validator';

export class N8nBlogPostDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  slug?: string;

  @IsString()
  content: string;

  @IsOptional()
  @IsString()
  excerpt?: string;

  @IsOptional()
  @IsString()
  featuredImage?: string;

  @IsOptional()
  categories?: string[] | string; // Puede venir como array o string separado por comas

  @IsOptional()
  tags?: string[] | string; // Puede venir como array o string separado por comas

  @IsOptional()
  @IsString()
  metaTitle?: string;

  @IsOptional()
  @IsString()
  metaDescription?: string;

  @IsOptional()
  @IsEnum(['draft', 'published', 'scheduled'])
  publishStatus?: 'draft' | 'published' | 'scheduled';

  @IsOptional()
  @IsDateString()
  publishAt?: string;
}


