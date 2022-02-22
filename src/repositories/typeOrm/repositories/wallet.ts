import Wallet from "@/src/domain/entities/wallet"
import { Repository } from "typeorm"
import WalletRepository from "../../interfaces/wallet"

export class WalletTypeOrmRepository extends Repository<Wallet> implements WalletRepository{
  
}