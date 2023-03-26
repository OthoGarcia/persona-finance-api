import { IUser, IUserFilter, IUserInput } from "@/auth/interfaces/auth.interface";
import { CreateCategoryDto } from "@/categories/dto/create-category.dto";
import { User } from "../entities/user.entity";


export default interface CategoryRepository {
  insert(createCategoryDto: CreateCategoryDto): Promise<void>
  findOneByName(name: string): Promise<void>
}
