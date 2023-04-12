import * as falso from '@ngneat/falso';
import { RegisterDTO } from '@/auth/DTO/register-user.dto';
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';

export async function getToken(app: INestApplication)  {
  const password = falso.randPassword()
  const registerDTO: RegisterDTO = {
    name: falso.randFullName(),
    email: falso.randEmail(),
    password,
    confirmPassword: password
  }

  await request(app.getHttpServer())
      .post('/auth/register')
      .send(registerDTO)
      .expect(204)
  const response = await request(app.getHttpServer())
  .post('/auth/login')
  .send({
    email: registerDTO.email,
    password: registerDTO.password
  })
  return response.body.token
}