import { IWallet, IWalletInput } from '@/src/domain/entities/interfaces/wallet';

export default interface WalletRepository {
  save(user: IWalletInput): Promise<IWallet>
}
