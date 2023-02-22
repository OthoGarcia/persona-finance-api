import { AuthService } from '@/auth/auth.service'
import { Test, TestingModule } from '@nestjs/testing'
import { LocalStrategy } from '@/auth/local-strategy'
import { JwtStrategy } from '@/auth/jwt.strategy'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { jwtConstants } from '@/auth/constants'
import { getRepositoryModule } from '@/config/configuration'
import UserRepository from '@/repositories/interfaces/user'
import { UserTypeOrmRepository } from '@/repositories/typeOrm/repositories/user'
import FactoryAbstractRepository from '@/repositories/factory/repository'
import { TYPES } from '@/utils/symbols'
import RepositoryMemoryFactory from '@/repositories/factory/memory-repository'

describe('AuthService', () => {
  let authService: AuthService
  let repositories: RepositoryMemoryFactory
  let userRepository: UserRepository
  
  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        PassportModule,
        JwtModule.register({
          secret: jwtConstants.secret,
          signOptions: { expiresIn: '60s' },
        }),
        getRepositoryModule()
      ],
      providers: [AuthService, LocalStrategy, JwtStrategy]
    }).compile()
    
    repositories = app.get<RepositoryMemoryFactory>(TYPES.Repositories)
    userRepository = repositories.userRepository
    authService = app.get<AuthService>(AuthService)
  })

  describe('register', () => {
    const user = {
      name: 'Otho',
      email: 'othogar@gmail.com',
      password: '123113',
      confirmPassword: '12312',
    }

    it('should register user', async () => {
      const response = await authService.registerUser(user)
      jest.spyOn(userRepository, 'findOne').mockImplementation(() => undefined);
      expect(response).toBe;
    })
  })
})
