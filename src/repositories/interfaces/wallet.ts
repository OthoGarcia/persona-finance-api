import { IWallet, IWalletInput } from "@/src/wallet/interfaces/wallet.interface";


export default interface WalletRepository {
  save(wallet: IWalletInput): Promise<IWallet>
}
