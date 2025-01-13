import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Event } from './event.entity';

@Entity('event-participants')
export class EventParticipants {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  event_id: number;

  @ManyToOne(() => Event, (event) => event.id)
  @JoinColumn({ name: 'event_id' })
  event: Event;

  @Column({ length: 256, nullable: false })
  fullname: string;

  @Column({ length: 256, nullable: false, unique: true })
  email: string;

  @CreateDateColumn()
  registered_at: Date;
}
