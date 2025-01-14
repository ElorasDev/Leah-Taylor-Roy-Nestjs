import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Blog } from 'src/modules/blog/entities/blog.entity';
import { Media } from 'src/modules/media/entities/media.entity';

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

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
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

  @OneToMany(() => Blog, (blog) => blog.user)
  blogs: Blog[];

  @OneToMany(() => Media, (media) => media.user)
  medias: Media[];
}
