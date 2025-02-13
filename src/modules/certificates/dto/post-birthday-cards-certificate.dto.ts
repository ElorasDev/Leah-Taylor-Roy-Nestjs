import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsEnum,
  IsEmail,
} from 'class-validator';

export enum BirthdayCardSelection {
  SELF = 'this card is for my birthday',
  OTHER = 'this card is for someone else',
}

export class PostBirthdayCardCertificateDto {
  @IsNotEmpty({ message: 'Recipient first name is required.' })
  @IsString()
  recipient_first_name: string;

  @IsNotEmpty({ message: 'Recipient last name is required.' })
  @IsString()
  recipient_last_name: string;

  @IsNotEmpty({ message: 'Recipient email is required.' })
  @IsEmail({}, { message: 'Invalid email address.' })
  email: string;

  @IsOptional()
  @IsString()
  recipient_address?: string;

  @IsNotEmpty({ message: 'Recipient postal code is required.' })
  @IsString()
  recipient_postal_code: string;

  @IsNotEmpty({ message: 'Recipient birthday is required.' })
  @IsString()
  recipient_birthday: string;

  @IsNotEmpty({ message: 'Selection is required.' })
  @IsEnum(BirthdayCardSelection, { message: 'Invalid selection.' })
  is_for_self: BirthdayCardSelection;
}
