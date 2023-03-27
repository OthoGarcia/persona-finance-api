import { WalletInputDTO } from '@/wallet/DTO/input'
import { TYPES } from '@/utils/symbols'
import { Inject, Injectable } from '@nestjs/common'
import { IWalletInput } from './interfaces/wallet.interface'
import { Wallet } from '@/repositories/entities/wallet'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'

@Injectable()
export class WalletService {
  constructor(
    @InjectRepository(Wallet) private walletsRepository: Repository<Wallet>,
  ) {}
  create(walletInputDTO: WalletInputDTO): Promise<IWalletInput> {
    return this.walletsRepository.save({ ...walletInputDTO })
  }
}
