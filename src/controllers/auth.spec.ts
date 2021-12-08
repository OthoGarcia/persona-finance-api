import { AuthRegisterService } from './../domain/use-case/auth/register';
import { AuthController } from './../controllers/auth';
import { Test, TestingModule } from '@nestjs/testing';

describe('AuthController', () => {
  let appController: AuthController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthRegisterService],
    }).compile();

    appController = app.get<AuthController>(AuthController);
  });

  describe('register', () => {
    const user = {
      name: 'Otho',
      email: 'othogar@gmail.com',
      password: '123113',
      confirmPassword: '123123',
    };

    it('should return validate name required', () => {
      expect(appController.register(user)).toBe(undefined);
    });
  });
});
