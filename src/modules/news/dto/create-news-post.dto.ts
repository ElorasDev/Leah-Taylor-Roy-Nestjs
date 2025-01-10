import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateNewsPostDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsInt()
  category_id: number;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsInt()
  like: number | 0;

  @IsNotEmpty()
  @IsString()
  index_image_url: string | 'default';

  @IsNotEmpty()
  @IsEnum(['archived', 'published', 'draft'])
  status: 'archived' | 'published' | 'draft';
}
