import { IUserInput, IUser, IUserFilter } from "@/auth/interfaces/auth.interface";
import { DataSource, EntityRepository, InsertResult, Repository, SaveOptions } from "typeorm";
import UserRepository from "../../interfaces/user";
import { Inject } from "@nestjs/common";
import { TYPES } from "@/utils/symbols";
import { User } from "@/repositories/entities/user.entity";
import CategoryRepository from "@/repositories/interfaces/category";
import { CreateCategoryDto } from "@/categories/dto/create-category.dto";

export class CategoryTypeOrmRepository implements CategoryRepository{
  async insert(createCategoryDto: CreateCategoryDto): Promise<void> {
      
  }

  async findOneByName(name: string): Promise<void> {
      
  }

}