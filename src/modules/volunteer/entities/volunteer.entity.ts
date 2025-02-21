import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('volunteer')
export class Volunteer {
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
  @CreateDateColumn({
    type: 'timestamp',
    transformer: {
      from: (value: Date) =>
        new Date(
          value.toLocaleString('en-CA', { timeZone: 'America/Toronto' }),
        ),
      to: (value: Date) => value,
    },
  })
  created_at: Date;
}
