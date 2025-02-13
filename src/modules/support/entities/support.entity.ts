import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('support')
export class Support {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, length: 256 })
  email: string;

  @Column({ length: 256 })
  postal_code: string;

  @Column({ nullable: false, length: 256 })
  first_name: string;

  @Column({ nullable: false, length: 256 })
  last_name: string;

  @Column({ nullable: false, length: 256 })
  phone_number: string;
}
