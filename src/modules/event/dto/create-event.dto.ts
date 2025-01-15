import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

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
  @IsDate()
  start_datetime: Date;

  @IsNotEmpty()
  @IsDate()
  end_datetime: Date;

  @IsNotEmpty()
  @IsEnum(['upcoming', 'ongoing', 'complated', 'canceled'])
  status: 'upcoming' | 'ongoing' | 'complated' | 'canceled';
}
