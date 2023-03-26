import { IUser } from '@/auth/interfaces/auth.interface';
import FactoryAbstractRepository from '@/repositories/factory/repository';
import { TYPES } from '@/utils/symbols';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

//TODO: change the use from many respositories to only the used ones.
@Injectable()
export class CategoriesService {
  constructor(
    @Inject(TYPES.Repositories) private repositories: FactoryAbstractRepository
  ) {}
  create(createCategoryDto: CreateCategoryDto, user: IUser) {
    const existCategory = this.repositories.categoryRepository.findOneByName(createCategoryDto.name)
    if (existCategory)
      throw new BadRequestException(
        'AlreadyExistsException',
        {description: 'Already existis this category for this user'}
      )
    this.repositories.categoryRepository.insert({
      ...createCategoryDto,
      userId: user.id
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
