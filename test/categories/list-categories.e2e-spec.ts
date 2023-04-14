import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as falso from '@ngneat/falso';
import { AuthModule } from '@/auth/auth.module';
import { User } from '@/repositories/entities/user.entity';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigModule } from '@nestjs/config';
import configuration, { getTypeormConfig } from '@/database/provider';
import { JoiPipeModule } from 'nestjs-joi';
import { getToken } from '../authentication-helpes';
import { CreateCategoryDto } from '@/categories/dto/create-category.dto';
import { CategoriesModule } from '@/categories/categories.module';


expect.extend({
  toContainObject(received, argument) {

    const pass = this.equals(received, 
      expect.arrayContaining([
        expect.objectContaining(argument)
      ])
    )

    if (pass) {
      return {
        message: () => (`expected ${this.utils.printReceived(received)} not to contain object ${this.utils.printExpected(argument)}`),
        pass: true
      }
    } else {
      return {
        message: () => (`expected ${this.utils.printReceived(received)} to contain object ${this.utils.printExpected(argument)}`),
        pass: false
      }
    }
  }
})

describe('categories/create', () => {
  let app: INestApplication;
  let token: string;
  let tokenB: string;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({load: [configuration]}),
        TypeOrmModule.forRoot(getTypeormConfig()),
        JoiPipeModule,
        AuthModule,
        CategoriesModule
      ],
      providers: [
        {
          provide: getRepositoryToken(User),
          useClass: Repository
        },

      ]
    })
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
    [token, tokenB] = await Promise.all([
      getToken(app),
      getToken(app)
    ])
  });
  
  const createCategoryDTO: CreateCategoryDto = {
    name: falso.randProductCategory()
  }

  it(`GET /categories/ -> check authentication`, async () => {
    const response = await request(app.getHttpServer())
      .get('/categories')
    expect(response.status).toEqual(401)
    expect(response.body.message).toEqual('Unauthorized')
  });


  it(`GET /categories/ -> create successfully`, async () => {
    await request(app.getHttpServer())
      .post('/categories')
      .set('Authorization', `Bearer ${token}`)
      .send(createCategoryDTO)

    const response = await request(app.getHttpServer())
      .get('/categories')
      .set('Authorization', `Bearer ${token}`)
    expect(response.status).toEqual(200)
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({name: createCategoryDTO.name})
      ])
    )
  });

  it(`GET /categories/ -> shouldn't list the item`, async () => {
    const newCategoryDto = {
      name: falso.randProductCategory()
    }
    await request(app.getHttpServer())
      .post('/categories')
      .set('Authorization', `Bearer ${tokenB}`)
      .send(newCategoryDto)

    const response = await request(app.getHttpServer())
      .get('/categories')
      .set('Authorization', `Bearer ${token}`)
    expect(response.status).toEqual(200)
    expect(response.body).toEqual(
      expect.not.arrayContaining([
        expect.objectContaining({name: newCategoryDto.name})
      ])
    )
  });

  it(`GET /categories/ -> list successfully`, async () => {
    const response = await request(app.getHttpServer())
      .get('/categories')
      .set('Authorization', `Bearer ${token}`)
    expect(response.status).toEqual(200)
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({name: createCategoryDTO.name})
      ])
    )
  });

  it(`GET /categories/ -> filter name successfully`, async () => {
    const response = await request(app.getHttpServer())
      .get('/categories')
      .query({
        name: createCategoryDTO.name
      })
      .set('Authorization', `Bearer ${token}`)
    expect(response.status).toEqual(200)
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({name: createCategoryDTO.name})
      ])
    )
  });

  it(`GET /categories/ -> filter name, return must be empty`, async () => {
    const response = await request(app.getHttpServer())
      .get('/categories')
      .query({
        name: 'teste'
      })
      .set('Authorization', `Bearer ${token}`)
    expect(response.status).toEqual(200)
    expect(response.body).toEqual(
      expect.not.arrayContaining([
        expect.objectContaining({name: createCategoryDTO.name})
      ])
    )
  });

  afterAll(async () => {
    await app.close();
  });
});