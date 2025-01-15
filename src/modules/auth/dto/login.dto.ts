import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'john_doe', description: 'The username of the user' })
  username: string;

  @IsNotEmpty()
  @MinLength(6)
  @ApiProperty({
    example: 'password123',
    description: 'The password of the user',
  })
  password: string;
}
