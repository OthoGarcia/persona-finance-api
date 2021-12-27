import { IUser, IUserFilter } from '@/src/domain/entities/interfaces/user'
import { LoginDTO } from '@/src/DTOs/auth/login'
import { RegisterDTO } from '@/src/DTOs/auth/register'
import FactoryAbstractRepository from '@/src/repositories/factory/repository'
import { TYPES } from '@/src/utils/symbols'
import { Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { compare, genSalt, hash } from 'bcrypt'

@Injectable()
export class AuthService {
  constructor(
    @Inject(TYPES.Repositories) private repositories: FactoryAbstractRepository,
    private jwtService: JwtService
  ) {}
  async registerUser(registerDTO: RegisterDTO): Promise<IUser> {
    const password = await this.encrypt(registerDTO.password)
    return this.repositories.userRepository.save({ ...registerDTO, password })
  }

  private async encrypt(word: string) {
    const salt = await genSalt(10);
    return await hash(word, salt)
  }
  async login (loginDTO: LoginDTO): Promise<{token: string}> {
    const user = await this.validUserLogin(loginDTO)
    const payload = {user}
    return {
      token: this.jwtService.sign(payload)
    }
  }
  async validUserLogin(loginDTO: LoginDTO): Promise<IUser> {
    const {email, password} = loginDTO
    const user = await this.findAndValidateUser({ email })
    const isValidPassword = await compare(password, user.password)
    if(!isValidPassword) throw new UnauthorizedException()
    return user
  }

  private async findAndValidateUser(filter: IUserFilter)  {
    const user = await this.repositories.userRepository.findOne(filter)
    if (!user) throw new NotFoundException('User not found');
    return user
  }
}
