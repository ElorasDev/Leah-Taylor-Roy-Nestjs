import {
  IsNotEmpty,
  IsString,
  IsOptional,
  Matches,
  IsEmail,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class SendContactDto {
  @ApiProperty({
    description: 'Full name of the contact',
    example: 'John Doe',
  })
  @IsNotEmpty()
  @IsString()
  fullname: string;

  @ApiPropertyOptional({
    description: 'Phone number of the contact',
    example: '+11234567890',
  })
  @IsOptional()
  @IsString()
  @Matches(/^\+?1?\d{10,14}$/, {
    message: 'Phone number must be a valid Canadian number',
  })
  phone_number: string;

  @ApiProperty({
    description: 'Email address of the contact',
    example: 'john.doe@example.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Content of the contact message',
    example: 'Hello, I would like to know more about your services.',
  })
  @IsNotEmpty()
  @IsString()
  content: string;
}
