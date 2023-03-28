import { AuthService } from '@/auth/auth.service'
import { Test, TestingModule } from '@nestjs/testing'
import { LocalStrategy } from '@/auth/local-strategy'
import { JwtStrategy } from '@/auth/jwt.strategy'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { jwtConstants } from '@/auth/constants'
import configuration, { getTypeormConfig } from '@/database/provider';
import { ConfigModule } from '@nestjs/config'
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm'
import { User } from '@/repositories/entities/user.entity'
import { ConflictException, NotFoundException, UnauthorizedException } from '@nestjs/common'
import { Repository } from 'typeorm'

describe('AuthService', () => {
  let authService: AuthService
  let userRepository: Repository<User>
  
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
      providers: [AuthService, LocalStrategy, JwtStrategy]
    }).compile()
    
    userRepository = app.get<Repository<User>>(getRepositoryToken(User))
    authService = app.get<AuthService>(AuthService)
  })

  describe('register', () => {
    const user = {
      name: 'test',
      email: 'test@test.com',
      password: '123113',
      confirmPassword: '12312',
    }

    it('should register user', async () => {
      const response = await authService.registerUser(user)
      jest.spyOn(userRepository, 'findOne').mockImplementation(() => undefined);
      expect(response).toBe;
    })

    it('user already exist', async () => {
      const response = authService.registerUser(user)
      await expect(response).rejects.toThrowError(ConflictException)
    })
  })

  describe('login', () => {
    const user = {
      email: 'test@test.com',
      password: '123113'
    }
    it('sucessfull login', async () => {
      const response = await authService.login(user)
      expect(response).toHaveProperty('token');
    })

    it('sucessfull login', async () => {
      user.password = 'invalid password'
      const response = authService.login(user)
      await expect(response).rejects.toThrowError(UnauthorizedException);
    })

    it('sucessfull login', async () => {
      user.email = 'invalid@user.com'
      const response = authService.login(user)
      await expect(response).rejects.toThrowError(NotFoundException);
    })
  })
})
