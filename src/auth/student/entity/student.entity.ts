import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Student {
  @PrimaryGeneratedColumn('uuid')
  account_id: string;

  @Column({ default: null })
  student_name: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column({ default: null })
  student_id: string;

  @Column({ default: null })
  grade: string;

  @Column({ default: null })
  class_id: string;

  @Column({ default: null })
  nickname: string;
}
