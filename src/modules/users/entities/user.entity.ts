import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100, nullable: true })
  fullname: string;

  @Column({ length: 100, nullable: false, unique: true })
  username: string;

  @Column({ length: 100, nullable: false, unique: true })
  email: string;

  @Column({ select: false, nullable: false })
  password_hash: string;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    nullable: false,
  })
  created_at: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    nullable: false,
  })
  updated_at: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    nullable: false,
  })
  last_login: Date;

  @Column({ type: 'int', nullable: false, default: 0 })
  failed_attempts: number;

  @Column({
    enum: ['active', 'locked', 'disabled'],
    nullable: false,
    default: 'active',
  })
  account_status: string;
}
