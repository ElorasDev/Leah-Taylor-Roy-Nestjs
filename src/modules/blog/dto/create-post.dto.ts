import { IsNotEmpty, IsString, IsEnum, IsInt } from 'class-validator';

export class CreatePostDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsInt()
  category_id: number;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsInt()
  like: number;

  @IsNotEmpty()
  @IsString()
  index_image_url: string | 'default';

  @IsNotEmpty()
  @IsEnum(['archived', 'published', 'draft'])
  status: 'archived' | 'published' | 'draft';
}
