import { IsNotEmpty, IsString, IsOptional, IsEmail } from 'class-validator';

export class PostUniqueCertificateDto {
  @IsNotEmpty({ message: 'First name is required.' })
  @IsString()
  first_name: string;

  @IsNotEmpty({ message: 'Recipient email is required.' })
  @IsEmail({}, { message: 'Invalid email address.' })
  email: string;

  @IsNotEmpty({ message: 'Last name is required.' })
  @IsString()
  last_name: string;

  @IsNotEmpty({ message: 'Phone number is required.' })
  @IsString()
  phone_number: string;

  @IsOptional()
  @IsString({ message: 'Certificate description must be a string.' })
  certificate_description?: string;
}
