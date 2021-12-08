import { IUser } from '@/src/domain/entities/interfaces/user';
import { RegisterDTO } from '@/src/DTOs/auth/register';
import FactoryAbstractRepository from '@/src/repositories/factory/repository';
import { TYPES } from '@/src/utils/symbols';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class AuthRegisterService {
  constructor(
    @Inject(TYPES.Repositories) private repositories: FactoryAbstractRepository,
  ) {}
  registerUser(registerDTO: RegisterDTO): Promise<IUser> {
    return this.repositories.userRepository.save({ ...registerDTO });
  }
}
