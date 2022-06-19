import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import falso from '@ngneat/falso';
import { AuthModule } from '@/src/auth/auth.module';
import { RegisterDTO } from '@/src/auth/DTO/register-user.dto';

describe('Auth', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AuthModule],
    })
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`POST /register`, () => {
    const password = falso.randPassword()
    return request(app.getHttpServer())
      .post('/register')
      .send({
        name: falso.randFullName(),
        email: falso.randEmail(),
        password,
        confirmPassword: password
      }as RegisterDTO)
      .expect(204)
  });

  afterAll(async () => {
    await app.close();
  });
});