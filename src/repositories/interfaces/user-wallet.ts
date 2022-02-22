import { IWallet, IWalletInput } from '@/src/domain/entities/interfaces/wallet';

export default interface UserWalletRepository {
  save(user: IWalletInput): Promise<IWallet>
}
