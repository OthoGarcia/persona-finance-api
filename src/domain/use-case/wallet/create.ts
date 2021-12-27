import { WalletInputDTO } from '@/src/DTOs/wallet/input'
import FactoryAbstractRepository from '@/src/repositories/factory/repository'
import { TYPES } from '@/src/utils/symbols'
import { Inject, Injectable } from '@nestjs/common'
import { IWalletInput } from '../../entities/interfaces/wallet'

@Injectable()
export class WalletCreate {
  constructor(
    @Inject(TYPES.Repositories) private repositories: FactoryAbstractRepository,
  ) {}
  create(walletInputDTO: WalletInputDTO): Promise<IWalletInput> {
    return this.repositories.walletRepository.save({ ...walletInputDTO })
  }
}
