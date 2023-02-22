import { WalletInputDTO } from '@/wallet/DTO/input'
import FactoryAbstractRepository from '@/repositories/factory/repository'
import { TYPES } from '@/utils/symbols'
import { Inject, Injectable } from '@nestjs/common'
import { IWalletInput } from './interfaces/wallet.interface'

@Injectable()
export class WalletService {
  constructor(
    @Inject(TYPES.Repositories) private repositories: FactoryAbstractRepository,
  ) {}
  create(walletInputDTO: WalletInputDTO): Promise<IWalletInput> {
    return this.repositories.walletRepository.save({ ...walletInputDTO })
  }
}
