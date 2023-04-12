import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as falso from '@ngneat/falso';
import { AuthModule } from '@/auth/auth.module';
import { RegisterDTO } from '@/auth/DTO/register-user.dto';
import { User } from '@/repositories/entities/user.entity';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigModule } from '@nestjs/config';
import configuration, { getTypeormConfig } from '@/database/provider';
import { JoiPipeModule } from 'nestjs-joi';
import { assert } from 'console';

describe('Auth', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({load: [configuration]}),
        TypeOrmModule.forRoot(getTypeormConfig()),
        JoiPipeModule,
        AuthModule
      ],
      providers: [
        {
          provide: getRepositoryToken(User),
          useClass: Repository
        }
      ]
    })
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });
  const password = falso.randPassword()
  const registerDTO: RegisterDTO = {
    name: falso.randFullName(),
    email: falso.randEmail(),
    password,
    confirmPassword: password
  }
  it(`POST /register -> success`, () => {
    return request(app.getHttpServer())
      .post('/auth/register')
      .send(registerDTO)
      .expect(204)
  });


  it(`POST /register -> password won't match`, () => {
    const password = falso.randPassword()
    return request(app.getHttpServer())
      .post('/auth/register')
      .send({
        ...registerDTO,
        confirmPassword: password + 'asd'
      })
      .expect(400)
      .then(response => {
        assert(response.body.message, 'Request validation of body failed, because: \"confirmPassword\" must be [ref:password]')
      })
  });

  it(`POST /register -> email is required`, async () => {
    const password = falso.randPassword()
    const response = await request(app.getHttpServer())
      .post('/auth/register')
      .send({
        ...registerDTO,
        email: undefined
      })
      
      expect(response.status).toEqual(400);
      expect(response.body.message).toEqual('Request validation of body failed, because: \"email\" is required');
  });

  it(`POST /register -> already exist`, async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/register')
      .send(registerDTO)
      expect(response.status).toEqual(409);
      expect(response.body.message).toEqual('Already has an user with this email registered');
  });


  it(`POST /login -> success`, async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: registerDTO.email,
        password: registerDTO.password
      })
      expect(response.status).toEqual(201)
      expect(response.body.token).toBeDefined()
  });
  

  it(`POST /login -> error email not found`, async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: 'not_registered@email.com',
        password: registerDTO.password
      })
      expect(response.status).toEqual(404)
      expect(response.body.message).toEqual('User not found')
  });

  it(`POST /login -> wrong password`, async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: registerDTO.email,
        password: 'wrong password'
      })
      expect(response.status).toEqual(401)
      expect(response.body.message).toEqual('Unauthorized')
  });


  it(`GET /profile -> success`, async () => {
    const login = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: registerDTO.email,
        password: registerDTO.password
      })
    expect(login.status).toEqual(201)
      
    const response = await request(app.getHttpServer())
      .get('/auth/profile')
      .set('Authorization', `Bearer ${login.body.token}`)
    expect(response.status).toEqual(200)
    expect(response.body.user.email).toEqual(registerDTO.email)
  });

  it(`GET /profile -> wrong token`, async () => {
    const login = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: registerDTO.email,
        password: registerDTO.password
      })
    expect(login.status).toEqual(201)
      
    const response = await request(app.getHttpServer())
      .get('/auth/profile')
      .set('Authorization', `Bearer ${login.body.token}-wrong`)
    expect(response.status).toEqual(401)
    expect(response.body.message).toEqual('Unauthorized')
  });

  afterAll(async () => {
    await app.close();
  });
});