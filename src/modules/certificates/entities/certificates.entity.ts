import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  TableInheritance,
} from 'typeorm';

@Entity('certificates')
@TableInheritance({ column: { type: 'varchar', name: 'certificate_type' } })
export abstract class Certificate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, length: 256 })
  email: string;
}
