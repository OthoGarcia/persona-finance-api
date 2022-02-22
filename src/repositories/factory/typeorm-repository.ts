import { Injectable } from '@nestjs/common'
import { UserTypeOrmRepository } from '../typeOrm/repositories/user'
import { WalletTypeOrmRepository } from '../typeOrm/repositories/wallet'
import FactoryAbstractRepository from './repository'

@Injectable()
export default class RepositoryTypeormFactory
  implements FactoryAbstractRepository
{
  constructor(
    readonly userRepository: UserTypeOrmRepository,
    readonly walletRepository: WalletTypeOrmRepository
    ) {}
}
