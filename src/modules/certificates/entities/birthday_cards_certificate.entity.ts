import { ChildEntity, Column } from 'typeorm';
import { Certificate } from './certificates.entity';

@ChildEntity('birthday_cards')
export class BirthdayCardCertificate extends Certificate {
  @Column({ length: 256 })
  recipient_first_name: string;

  @Column({ length: 256 })
  recipient_last_name: string;

  @Column({ nullable: true, length: 256 })
  recipient_address: string;

  @Column({ length: 256 })
  recipient_postal_code: string;

  @Column({ length: 256 })
  recipient_birthday: string;

  @Column({
    enum: ['this card is for my birthday', 'this card is for someone else'],
  })
  is_for_self: 'this card is for my birthday' | 'this card is for someone else';
}
