import {
  IsNotEmpty,
  IsString,
  IsEmail,
  IsOptional,
  IsEnum,
  IsBoolean,
} from 'class-validator';

export enum AnniversaryCertificateSelector {
  SELF = 'this certificate is for my anniversary',
  OTHER = 'this certificate is for someone else',
}

export enum AnniversaryCertificateDestination {
  MAIL_TO_ME = 'mail the certificate to me',
  MAIL_TO_RECIPIENT = 'mail the certificate to the recipient',
}

export class PostAnniversaryCertificateDto {
  @IsNotEmpty({ message: 'First name is required.' })
  @IsString()
  first_name: string;

  @IsNotEmpty({ message: 'Last name is required.' })
  @IsString()
  last_name: string;

  @IsNotEmpty({ message: 'Phone number is required.' })
  @IsString()
  phone_number: string;

  @IsNotEmpty({ message: 'Certificate selection is required.' })
  @IsEnum(AnniversaryCertificateSelector, {
    message: 'Invalid certificate selection.',
  })
  select_certificate: AnniversaryCertificateSelector;

  @IsNotEmpty({ message: 'Recipient 1 first name is required.' })
  @IsString()
  recipient1_first_name: string;

  @IsNotEmpty({ message: 'Recipient 1 last name is required.' })
  @IsString()
  recipient1_last_name: string;

  @IsNotEmpty({ message: 'Recipient 2 first name is required.' })
  @IsString()
  recipient2_first_name: string;

  @IsNotEmpty({ message: 'Recipient 2 last name is required.' })
  @IsString()
  recipient2_last_name: string;

  @IsNotEmpty({ message: 'Recipient email is required.' })
  @IsEmail({}, { message: 'Invalid email address.' })
  email: string;

  @IsOptional()
  @IsString()
  recipient_address?: string;

  @IsNotEmpty({ message: 'Postal code is required.' })
  @IsString()
  postal_code: string;

  @IsNotEmpty({ message: 'Date of marriage is required.' })
  @IsString()
  date_of_marriage: string;

  @IsNotEmpty({ message: 'Certificate destination is required.' })
  @IsEnum(AnniversaryCertificateDestination, {
    message: 'Invalid certificate destination.',
  })
  certificate_destination: AnniversaryCertificateDestination;

  @IsOptional()
  @IsBoolean({ message: 'Additional certificates must be a boolean value.' })
  additional_certificates?: boolean;

  @IsOptional()
  @IsString()
  note?: string;
}
