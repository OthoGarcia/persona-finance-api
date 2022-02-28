import { IWalletInput, IWallet } from "@/src/wallet/interfaces/wallet.interface"
import { AbstractRepository, EntityRepository, Repository } from "typeorm"
import WalletRepository from "../../interfaces/wallet"
import { Wallet } from "../entities/wallet.entity"

@EntityRepository(Wallet)
export class WalletTypeOrmRepository extends AbstractRepository<Wallet> implements WalletRepository{
  async save(wallet: IWalletInput): Promise<IWallet> {
    return this.repository.save({...wallet})
  }
}