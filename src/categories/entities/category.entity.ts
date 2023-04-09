import { User } from "@/repositories/entities/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string;

  @Column()
  level: number

  @Column({default: false})
  isDefault: boolean

  @ManyToOne(() => User, (user) => user.categories)
  user: User

  @ManyToOne(() => Category, (category) => category.children)
  parent?: Category;

  @OneToMany(() => Category, (category) => category.parent)
  children: Category[]
}
