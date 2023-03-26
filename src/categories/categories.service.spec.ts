import { IUser } from '@/auth/interfaces/auth.interface';
import { getRepositoryModule } from '@/config/configuration';
import RepositoryMemoryFactory from '@/repositories/factory/memory-repository';
import CategoryRepository from '@/repositories/interfaces/category';
import { TYPES } from '@/utils/symbols';
import { BadRequestException, ConflictException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesService } from './categories.service';

describe('CategoriesService', () => {
  let service: CategoriesService;
  let repositories: RepositoryMemoryFactory
  let categoryRepository: CategoryRepository

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CategoriesService],
      imports: [
        getRepositoryModule()
      ]
    }).compile();

    service = module.get<CategoriesService>(CategoriesService);
    repositories = module.get<RepositoryMemoryFactory>(TYPES.Repositories)
    categoryRepository = repositories.categoryRepository
  });
  describe('create new category', () => {
    const user: IUser = {
      email: "othogar@gmail.com",
      password: '123123',
      id: 1
    }
    it('successfully create a category', async () => {
      const createCategoryDTO = {
        name: 'Carro'
      }
      await service.create(createCategoryDTO, user)
      const spy = jest.spyOn(categoryRepository, 'insert')
      expect(spy).toHaveBeenCalledTimes(1);
    });

    it('successfully create a category with parent id', async () => {
      const createCategoryDTO = {
        name: 'Apartamento',
        parentId: 1
      }
      await service.create(createCategoryDTO, user)
      const spy = jest.spyOn(categoryRepository, 'insert')
      expect(spy).toHaveBeenCalledTimes(1);
    });

    it('category already exist', async () => {
      const createCategoryDTO = {
        name: 'Carro'
      }
      await service.create(createCategoryDTO, user)
      const response = service.create(createCategoryDTO, user)
      await expect(response).rejects.toThrowError('AlreadyExistsException')
    })
    //TODO: implement the test
    // it('category parent id not found', async () => {
    //   const createCategoryDTO = {
    //     name: 'Gasolina',
    //     parentId: 50
    //   }
    //   const response = service.create(createCategoryDTO, user)
    //   await expect(response).rejects.toThrowError(NotFoundException)
    // })
  })  
});
