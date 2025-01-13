import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class RegisterClientDto {
  @ApiProperty({
    example: 'John Doe',
    description: 'The  full name of the user',
  })
  @IsNotEmpty()
  @IsString()
  fullname: string;

  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'The email of the client',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
