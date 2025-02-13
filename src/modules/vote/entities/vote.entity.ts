import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('vote')
export class Vote {
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
}
