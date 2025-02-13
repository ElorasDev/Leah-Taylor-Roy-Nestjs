import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateEventDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  index_image_url: string | 'default';

  @IsOptional()
  @IsString()
  category_id: number;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  start_datetime: string;

  @IsNotEmpty()
  @IsString()
  end_datetime: string;

  @IsNotEmpty()
  @IsString()
  location: string;

  @IsNotEmpty()
  @IsEnum(['upcoming', 'ongoing', 'complated', 'canceled'])
  status: 'upcoming' | 'ongoing' | 'complated' | 'canceled';
}
