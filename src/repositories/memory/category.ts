import { Injectable } from '@nestjs/common'
import UserRepository from '../interfaces/user'
import { maxBy } from 'lodash'
import { users } from './data/users'
import { IUser, IUserFilter } from '@/auth/interfaces/auth.interface'
import { User } from '../entities/user.entity'
import CategoryRepository from '../interfaces/category'
import { CreateCategoryDto } from '@/categories/dto/create-category.dto'

@Injectable()
export class CategoryMemoryRepository implements CategoryRepository {
  async insert(createCategoryDto: CreateCategoryDto): Promise<void> {
      
  }

  async findOneByName(name: string): Promise<void> {
      
  }
}
