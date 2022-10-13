import { Optional } from '@nestjs/common';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Admin {
  @PrimaryGeneratedColumn('uuid')
  account_id: string;

  @Optional()
  @Column()
  nickname: string;

  @Column()
  username: string;

  @Column()
  password: string;
}
