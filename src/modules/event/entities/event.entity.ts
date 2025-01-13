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

@Entity('events')
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 256, nullable: false })
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ nullable: false, type: 'text' })
  index_image_url: string | 'default';

  @Column({ nullable: true }) // must be releation to cateroy table
  category_id: number;

  @Column({ type: 'date', nullable: true })
  start_datetime: Date;

  @Column({ type: 'date', nullable: true })
  end_datetime: Date;

  @Column({ nullable: false, type: 'int', default: 0 })
  members: number | 0;

  @Column({ type: 'text', nullable: true })
  location: string;

  @Column({
    type: 'enum',
    enum: ['upcoming', 'ongoing', 'complated', 'canceled'],
    nullable: false,
  })
  status: 'upcoming' | 'ongoing' | 'complated' | 'canceled';

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({ nullable: false })
  organizer_id: number;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'organizer_id' })
  user: User;
}
