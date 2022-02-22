import { IWallet, IWalletInput } from "@/src/wallet/interfaces/wallet.interface";

export default interface UserWalletRepository {
  save(user: IWalletInput): Promise<IWallet>
}
