import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';

export class RegisterClientDto {
  @ApiProperty({
    example: 'John Doe',
    description: 'The  full name of the user',
  })
  @IsNotEmpty()
  @IsString()
  fullname: string;

  @ApiProperty({
    description: 'Phone number of the contact',
    example: '+11234567890',
  })
  @IsNotEmpty()
  @IsString()
  @Matches(/^(\+?1)?[-.\s]?(\(?\d{3}\)?[-.\s]?)?\d{3}[-.\s]?\d{4}$/, {
    message: 'Phone number must be a valid Canadian number',
  })
  phone_number: string;

  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'The email of the client',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
