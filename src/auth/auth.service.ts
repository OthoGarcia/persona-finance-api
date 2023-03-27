import { LoginDTO } from '@/auth/DTO/login.dto'
import { RegisterDTO } from '@/auth/DTO/register-user.dto'
import { User } from '@/repositories/entities/user.entity'
import { InjectRepository } from '@nestjs/typeorm';
import { ConflictException, Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { compare, genSalt, hash } from 'bcrypt'
import { IUser, IUserFilter } from './interfaces/auth.interface'
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}
  async registerUser(registerDTO: RegisterDTO): Promise<IUser> {
    const user = await this.usersRepository.findOne({ where: { email: registerDTO.email}})
    if(user) throw new ConflictException('Already has an user with this email registered')
    const password = await this.encrypt(registerDTO.password)
    return this.usersRepository.save({ ...registerDTO, password })
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
    const user = await this.usersRepository.findOne({where: {...filter}})
    if (!user) throw new NotFoundException('User not found');
    return user
  }
}
