import { PartialType } from '@nestjs/swagger';
import { CreateMediaDto } from './create-media.dto';
import { IsOptional } from 'class-validator';

export class UpdateMediaDto extends PartialType(CreateMediaDto) {
  @IsOptional()
  filename?: string;

  @IsOptional()
  path?: string;

  @IsOptional()
  mimetype?: string;

  @IsOptional()
  size?: number;

  @IsOptional()
  file_type?: 'image' | 'video' | 'document';

  @IsOptional()
  uploaded_by?: number;

  @IsOptional()
  published?: boolean;
}
