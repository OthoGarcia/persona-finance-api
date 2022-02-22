import { IUser } from '@/src/auth/interfaces/auth.interface'
import { IWallet } from '@/src/wallet/interfaces/wallet.interface'
import { Injectable } from '@nestjs/common'
import { maxBy } from 'lodash'
import WalletRepository from '../interfaces/wallet'

@Injectable()
export class WalletMemoryRepository implements WalletRepository {
  private wallets: IWallet[]
  constructor() {
    this.wallets = []
  }
  async save(wallet: IWallet): Promise<IUser> {
    const lastId = maxBy(this.wallets, (w) => w.id)?.id || 0
    const newWallet = {
      ...wallet,
      id: lastId + 1,
    }
    this.wallets.push(newWallet)
    console.log(this.wallets)
    return new Promise(() => wallet)
  }

  async create(wallet: IWallet): Promise<IUser> {
    const lastId = maxBy(this.wallets, (w) => w.id)?.id || 0
    const newWallet = {
      ...wallet,
      id: lastId + 1,
    }
    this.wallets.push(newWallet)
    console.log(this.wallets)
    return new Promise(() => wallet)
  }
}
