import { ChildEntity, Column } from 'typeorm';
import { Certificate } from './certificates.entity';

@ChildEntity('anniversary')
export class AnniversaryCertificate extends Certificate {
  @Column({ length: 256 })
  first_name: string;

  @Column({ length: 256 })
  last_name: string;

  @Column({ length: 256 })
  phone_number: string;

  @Column({
    enum: [
      'this certificate is for my anniversary',
      'this certificate is for someone else',
    ],
  })
  select_certificate:
    | 'this certificate is for my anniversary'
    | 'this certificate is for someone else';

  @Column({ length: 256 })
  recipient1_first_name: string;

  @Column({ length: 256 })
  recipient1_last_name: string;

  @Column({ length: 256 })
  recipient2_first_name: string;

  @Column({ length: 256 })
  recipient2_last_name: string;

  @Column({ length: 256 })
  recipient_email: string;

  @Column({ nullable: true, length: 256 })
  recipient_address: string;

  @Column({ length: 256 })
  postal_code: string;

  @Column({ length: 256 })
  date_of_marriage: string;

  @Column({
    enum: [
      'mail the certificate to me',
      'mail the certificate to the recipient',
    ],
  })
  certificate_destination:
    | 'mail the certificate to me'
    | 'mail the certificate to the recipient';

  @Column({ nullable: true, type: 'boolean' })
  additional_certificates: boolean;

  @Column({ nullable: true, type: 'text' })
  note: string;
}
