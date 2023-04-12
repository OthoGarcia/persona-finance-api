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
import { LoggedUser } from '@/auth/logged-user.injection';

describe('categories/create', () => {
  let app: INestApplication;
  let token: string;

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
    token = await getToken(app)
  });
  
  const createCategoryDTO: CreateCategoryDto = {
    name: falso.randProductCategory()
  }

  it(`POST /categories/create -> test authentication`, async () => {
    const response = await request(app.getHttpServer())
      .post('/categories/create')
      .send(createCategoryDTO)
    expect(response.status).toEqual(401)
    expect(response.body.message).toEqual('Unauthorized')
  });

  it(`POST /categories/create -> successfully`, async () => {
    const response = await request(app.getHttpServer())
      .post('/categories/create')
      .set('Authorization', `Bearer ${token}`)
      .send(createCategoryDTO)
    expect(response.status).toEqual(201)
    
    //TODO: get the created category

  });

  it(`POST /categories/create -> create with parentId successfully`, async () => {
    const response = await request(app.getHttpServer())
      .post('/categories/create')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: falso.randProductCategory(),
        parentId: 1
      })
    expect(response.status).toEqual(201)
    
    //TODO: get the created category

  });

  it(`POST /categories/create -> already created`, async () => {
    const response = await request(app.getHttpServer())
      .post('/categories/create')
      .set('Authorization', `Bearer ${token}`)
      .send(createCategoryDTO)
    expect(response.status).toEqual(400)
    expect(response.body.message).toEqual('AlreadyExistsException')
  });

  //TODO: test for level category.

  afterAll(async () => {
    await app.close();
  });
});