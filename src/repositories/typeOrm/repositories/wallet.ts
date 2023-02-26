import { Wallet } from "@/repositories/entities/wallet"
import { IWalletInput, IWallet } from "@/wallet/interfaces/wallet.interface"
import { Repository } from "typeorm"
import WalletRepository from "../../interfaces/wallet"
 
export class WalletTypeOrmRepository extends Repository<Wallet> implements WalletRepository{
  async save2(wallet: IWalletInput): Promise<IWallet> {
    return this.save({...wallet})
  }
}