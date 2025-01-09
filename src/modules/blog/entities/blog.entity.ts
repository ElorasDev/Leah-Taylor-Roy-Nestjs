import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from 'src/modules/users/entities/user.entity';

@Entity('posts')
export class Blog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 256, nullable: false })
  title: string;

  @Column({ nullable: false })
  category_id: number;

  @Column({ type: 'text', nullable: false })
  content: string;

  @Column({ nullable: false, default: 0, type: 'int' })
  like: number;

  @Column({ type: 'text', nullable: false, default: 'default' })
  index_image_url: string;

  @Column({
    type: 'enum',
    enum: ['archived', 'published', 'draft'],
    default: 'draft',
  })
  status: 'archived' | 'published' | 'draft';

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({ nullable: false })
  user_id: number;

  @ManyToOne(() => User, (user) => user.blogs)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
