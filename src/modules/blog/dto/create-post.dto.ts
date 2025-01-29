import {
  IsNotEmpty,
  IsString,
  IsEnum,
  IsInt,
  IsOptional,
} from 'class-validator';

export class CreatePostDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsInt()
  category_id: number | null;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsOptional()
  @IsInt()
  like: number;

  @IsNotEmpty()
  @IsString()
  index_image_url: string | 'default';

  @IsNotEmpty()
  @IsEnum(['archived', 'published', 'draft'])
  status: 'archived' | 'published' | 'draft';
}
