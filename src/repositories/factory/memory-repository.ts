import { Injectable } from '@nestjs/common'
import { CategoryMemoryRepository } from '../memory/category'
import { UserMemoryRepository } from '../memory/user'
import { WalletMemoryRepository } from '../memory/wallet'
import FactoryAbstractRepository from './repository'

@Injectable()
export default class RepositoryMemoryFactory
  implements FactoryAbstractRepository
{
  constructor(
    readonly userRepository: UserMemoryRepository,
    readonly walletRepository: WalletMemoryRepository,
    readonly categoryRepository: CategoryMemoryRepository

    ) {}
}
