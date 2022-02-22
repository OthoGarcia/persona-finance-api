import { IWallet, IWalletInput } from "@/src/wallet/interfaces/wallet.interface";


export default interface WalletRepository {
  save(user: IWalletInput): Promise<IWallet>
}
