import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  account_id: number;

  @Column()
  student_name: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  student_id: string;

  @Column()
  grade: string;

  @Column()
  class_id: string;
}
