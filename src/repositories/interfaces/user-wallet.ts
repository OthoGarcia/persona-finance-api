import { IWallet, IWalletInput } from "@/wallet/interfaces/wallet.interface";

export default interface UserWalletRepository {
  save(user: IWalletInput): Promise<IWallet>
}
