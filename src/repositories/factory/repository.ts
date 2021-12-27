import UserRepository from '../interfaces/user'
import WalletRepository from '../interfaces/wallet';

export default interface FactoryAbstractRepository {
  userRepository: UserRepository
  walletRepository: WalletRepository
}
