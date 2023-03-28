import { AuthService } from '@/auth/auth.service'
import { AuthController } from '@/auth/auth.controller.'
import { Test, TestingModule } from '@nestjs/testing'
import { LocalStrategy } from '@/auth/local-strategy'
import { JwtStrategy } from '@/auth/jwt.strategy'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { jwtConstants } from '@/auth/constants'
import configuration, { getTypeormConfig } from '@/database/provider';
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from '@/repositories/entities/user.entity'

describe('AuthController', () => {
  let authController: AuthController
  let authService: AuthService

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({load: [configuration]}),
        TypeOrmModule.forRoot(getTypeormConfig()),
        PassportModule,
        JwtModule.register({
          secret: jwtConstants.secret,
          signOptions: { expiresIn: '60s' },
        }),
        TypeOrmModule.forFeature([User])
      ],
      controllers: [AuthController],
      providers: [AuthService, LocalStrategy, JwtStrategy]
    }).compile()

    authController = app.get<AuthController>(AuthController)
    authService = app.get<AuthService>(AuthService)
  })

  describe('register', () => {
    const user = {
      name: 'Otho',
      email: 'othogar@gmail.com',
      password: '123113',
      confirmPassword: '12312',
    }

    it('should call the service to register user', () => {
      const registerUserSpy = jest.spyOn(authService, 'registerUser')
        .mockImplementation(() => new Promise(() => user));
      const response = authController.register(user)
      expect(registerUserSpy).toBeCalledTimes(1);
    })
  })
})
