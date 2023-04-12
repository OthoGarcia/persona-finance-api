import { AuthService } from '@/auth/auth.service'
import { Test, TestingModule } from '@nestjs/testing'
import { LocalStrategy } from '@/auth/local-strategy'
import { JwtStrategy } from '@/auth/jwt.strategy'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { jwtConstants } from '@/auth/constants'
import * as falso from '@ngneat/falso';
import { getRepositoryToken} from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CategoriesService } from './categories.service'
import { Category } from './entities/category.entity'
import { CreateCategoryDto } from './dto/create-category.dto'
import { LoggedUser } from '@/auth/logged-user.injection'
import { IUser } from "@/auth/interfaces/auth.interface";
import { BadRequestException } from '@nestjs/common'
import { CategoryRepository } from './categories.repository'


//TODO: fazer o mock o usuario logado
describe('CategoriesService', () => {
  let categoryService: CategoriesService
  let categoryRepository: Repository<Category>

  const mockLogedUser = {
    user: {
      id: falso.randNumber(),
      email: falso.randEmail()
    } as IUser
  }
  const mockCategoryRepository = {
    findOne: jest.fn().mockImplementation(dto => Promise.resolve(undefined)),
    insert: jest.fn().mockImplementation(dto => Promise.resolve(undefined)),
    query: jest.fn().mockImplementationOnce(dto => Promise.resolve([{level: 1}])),
    getCategoryLevel: jest.fn().mockImplementationOnce(dto => Promise.resolve([{level: 1}]))
  }
  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        PassportModule,
        JwtModule.register({
          secret: jwtConstants.secret,
          signOptions: { expiresIn: '60s' },
        }),
      ],
      providers: [
        CategoriesService,
        {
          provide: LoggedUser,
          useValue: mockLogedUser
        },
        {
          provide: CategoryRepository,
          useValue: mockCategoryRepository
        }
      ]
    }).compile()
    
    categoryRepository = app.get<Repository<Category>>(CategoryRepository)
    categoryService = app.get<CategoriesService>(CategoriesService)
  })
  const createCategoryDTO: CreateCategoryDto = {
    name: falso.randProductCategory()
  }
  describe('create', () => {
    it('create category successfully', async () => {
      const response = await categoryService.create(createCategoryDTO)
      expect(response).toBeUndefined()
    })

    it('create category with parent id successfully', async () => {
      const response = await categoryService.create({
        ...createCategoryDTO,
        parentId: 1
      })
      expect(response).toBeUndefined()
    })

    it('Category already existis', async () => {
      mockCategoryRepository.findOne = jest.fn().mockImplementation(dto => Promise.resolve(createCategoryDTO))
      const response = categoryService.create(createCategoryDTO)
      await expect(response).rejects.toThrowError(BadRequestException);
    })
  })
})
