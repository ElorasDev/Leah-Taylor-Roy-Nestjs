import {
  IsNotEmpty,
  IsString,
  IsEmail,
  IsOptional,
  IsEnum,
  IsBoolean,
} from 'class-validator';

export enum CertificateSelectorEnum {
  SELF = 'this certificate is for my birthday',
  OTHER = 'this certificate is for someone else',
}

export enum CertificateDestinationEnum {
  MAIL_TO_ME = 'mail the certificate to me',
  MAIL_TO_RECIPIENT = 'mail the certificate to the recipient',
}

export class PostBirthdayCertificateDto {
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
  @IsEnum(CertificateSelectorEnum, {
    message: 'Invalid certificate selection.',
  })
  select_certificate: CertificateSelectorEnum;

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

  @IsNotEmpty({ message: 'Postal code is required.' })
  @IsString()
  postal_code: string;

  @IsNotEmpty({ message: 'Recipient birthday is required.' })
  @IsString({ message: 'Recipient birthday must be a string.' })
  recipient_birthday: string;

  @IsNotEmpty({ message: 'Certificate destination is required.' })
  @IsEnum(CertificateDestinationEnum, {
    message: 'Invalid certificate destination.',
  })
  certificate_destination: CertificateDestinationEnum;

  @IsOptional()
  @IsBoolean({ message: 'Additional certificates must be a boolean.' })
  additional_certificates?: boolean;

  @IsOptional()
  @IsString()
  note?: string;
}
