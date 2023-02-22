import { IUser } from '@/auth/interfaces/auth.interface';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User implements IUser{
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column()
  password: string;
}