import { ChildEntity, Column } from 'typeorm';
import { Certificate } from './certificates.entity';

@ChildEntity('unique')
export class UniqueCertificate extends Certificate {
  @Column({ length: 256 })
  first_name: string;

  @Column({ length: 256 })
  last_name: string;

  @Column({ length: 256 })
  phone_number: string;

  @Column({ nullable: true, type: 'text' })
  certificate_description: string;
}
