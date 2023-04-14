import { IUser } from '@/auth/interfaces/auth.interface';
import { LoggedUser } from '@/auth/logged-user.injection';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryRepository } from './categories.repository';
import { FilterCategoryDto } from './dto/filter-category.dto';


@Injectable()
export class CategoriesService {
  constructor(
    private categoriesRepository: CategoryRepository,
    @Inject(LoggedUser) private loggedUser: LoggedUser
  ) {}

  get user(): IUser|undefined{
    return this.loggedUser?.user
  }
  
  async calculateLevel(parentId?: number): Promise<number|undefined> {
    if (!parentId)
      return 0
    const result = await this.categoriesRepository.getCategoryLevel(parentId)
    const level = result[0]['level']
    if (level)
      return level
    return 0
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
      user: {id: this.user?.id},
      level
    })
  }

  async findAll(filterCategoryDto: FilterCategoryDto) {
    return this.categoriesRepository.find({
      where: {
        user: this.user,
        ...filterCategoryDto
      }
    })
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
