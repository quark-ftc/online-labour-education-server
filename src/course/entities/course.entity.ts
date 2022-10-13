import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
@Entity()
export class Course {
  @PrimaryGeneratedColumn('uuid')
  course_id: string;

  @Column()
  title: string;

  @Column({ type: 'decimal' })
  price: number;

  @Column({ length: 500 })
  description: string;

  @Column()
  url: string;

  @Column()
  preview: string;

  @Column()
  for_grade: string;

  @CreateDateColumn()
  create_date: Date;

  @CreateDateColumn()
  update_date: Date;

  @Column()
  show: boolean;
}
