import { Injectable } from '@nestjs/common';
import { UserMemoryRepository } from '../memory/user';
import FactoryAbstractRepository from './repository';

@Injectable()
export default class RepositoryMemoryFactory
  implements FactoryAbstractRepository
{
  constructor(readonly userRepository: UserMemoryRepository) {}
}
