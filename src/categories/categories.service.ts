import { IUser } from '@/auth/interfaces/auth.interface';
import { LoggedUser } from '@/auth/logged-user.injection';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

//TODO: change the use from many respositories to only the used ones.
@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category) private categoriesRepository: Repository<Category>,
    @Inject(LoggedUser) private loggedUser: LoggedUser
  ) {}

  get user(): IUser{
    return this.loggedUser.user
  }
  
  async calculateLevel(parentId?: number): Promise<number|undefined> {
    if (!parentId)
      return
    const result = await this.categoriesRepository.query(`
      WITH RECURSIVE rectree AS (
        SELECT c.id,
          c.parentId,
          c.name
            FROM category c
      UNION ALL 
        SELECT 
            t.id,
          t.parentId,
          t.name
          FROM category t 
          JOIN rectree
            ON t.parentId  = rectree.id
      ) SELECT COUNT(id) as 'level', id, name  FROM rectree where id = ? group by id, parentId, name;
      `, [parentId])
    return result[0]['level']
  }

  async create(createCategoryDto: CreateCategoryDto): Promise<void> {
    const calculateLevel = this.calculateLevel(createCategoryDto.parentId)
    const existCategory = await this.categoriesRepository.findOne({where: {name: createCategoryDto.name, user: this.user}})
    if (existCategory)
      throw new BadRequestException(
        'AlreadyExistsException',
        {description: 'Already existis this category for this user'}
      )
    const level = await calculateLevel
    await this.categoriesRepository.insert({
      ...createCategoryDto,
      parent: {id: createCategoryDto.parentId},
      user: {id: this.user.id},
      level
    })
  }

  findAll() {
    return `This action returns all categories`;
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
