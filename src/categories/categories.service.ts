import { IUser } from '@/auth/interfaces/auth.interface';
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
  ) {}
  create(createCategoryDto: CreateCategoryDto, user: IUser) {
    const existCategory = this.categoriesRepository.findOne({where: {name: createCategoryDto.name}})
    if (existCategory)
      throw new BadRequestException(
        'AlreadyExistsException',
        {description: 'Already existis this category for this user'}
      )
    this.categoriesRepository.insert({
      ...createCategoryDto,
      user: {id: user.id}
    })
    return 'This action adds a new category';
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
