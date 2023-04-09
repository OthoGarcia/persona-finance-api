import { IUser } from '@/auth/interfaces/auth.interface';
import { Category } from '@/categories/entities/category.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

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

  @OneToMany(() => Category, (category) => category.parent)
  categories: Category[]
}