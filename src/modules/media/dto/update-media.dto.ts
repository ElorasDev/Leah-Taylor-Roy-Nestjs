import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateMediatDto {
  @IsOptional()
  @IsBoolean()
  published?: boolean;
}
