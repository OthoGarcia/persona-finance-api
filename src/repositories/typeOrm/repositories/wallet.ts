import { Repository } from "typeorm"
import WalletRepository from "../../interfaces/wallet"
import { Wallet } from "../entities/wallet.entity"

export class WalletTypeOrmRepository extends Repository<Wallet> implements WalletRepository{
  
}