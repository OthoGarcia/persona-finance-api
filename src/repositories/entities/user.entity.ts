import { IUser } from '@/auth/interfaces/auth.interface';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User implements IUser{
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name?: string;

  @Column({ length: 100 })
  email: string;

  @Column({ length: 100 })
  password: string;

  constructor(user: IUser){
    this.id = user?.id
    this.name = user?.name
    this.email = user?.email
    this.password = user?.password
  }
}