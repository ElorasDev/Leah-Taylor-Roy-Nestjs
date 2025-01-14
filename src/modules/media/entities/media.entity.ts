import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from 'src/modules/users/entities/user.entity';

@Entity('media')
export class Media {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 256, nullable: false })
  filename: string;

  @Column({ type: 'varchar', length: 512, nullable: false })
  path: string;

  @Column({ type: 'varchar', length: 128, nullable: false })
  mimetype: string;

  @Column({ type: 'float', nullable: false })
  size: number;

  @Column({ type: 'boolean', nullable: false, default: false })
  published: boolean;

  @Column({
    type: 'enum',
    enum: ['image', 'video', 'document'],
    default: 'image',
    nullable: false,
  })
  file_type: 'image' | 'video' | 'document';

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({ type: 'int', nullable: false })
  uploaded_by: number;

  @ManyToOne(() => User, (user) => user.medias)
  @JoinColumn({ name: 'uploaded_by' })
  user: User;
}
