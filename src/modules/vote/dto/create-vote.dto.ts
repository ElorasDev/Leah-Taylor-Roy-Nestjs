import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateVoteDto {
  @IsNotEmpty({ message: 'First name is required.' })
  @IsString()
  first_name: string;

  @IsNotEmpty({ message: 'Recipient email is required.' })
  @IsEmail({}, { message: 'Invalid email address.' })
  email: string;

  @IsNotEmpty({ message: 'Postal code is required.' })
  @IsString()
  postal_code: string;

  @IsNotEmpty({ message: 'Last name is required.' })
  @IsString()
  last_name: string;
}
