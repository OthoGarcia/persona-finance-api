import { IWallet, IWalletInput } from "@/wallet/interfaces/wallet.interface";


export default interface WalletRepository {
  save(wallet: IWalletInput): Promise<IWallet>
}
