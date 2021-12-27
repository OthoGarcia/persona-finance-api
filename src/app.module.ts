import { AuthService } from './domain/use-case/auth/auth'
import { AuthController } from '@/src/controllers/auth'
import { Module } from '@nestjs/common'
import { JoiPipeModule } from 'nestjs-joi'
import { UserMemoryRepository } from './repositories/memory/user'
import RepositoryMemoryFactory from './repositories/factory/memory-repository'
import { TYPES } from './utils/symbols'
import { WalletMemoryRepository } from './repositories/memory/wallet'
import { WalletCreate } from './domain/use-case/wallet/create'
import { WalletController } from './controllers/wallet'
import { LocalStrategy } from './domain/use-case/auth/local-strategy'
import { AuthModule } from './modules/auth'
import { RepositoryModule } from './modules/repository'

@Module({
  imports: [JoiPipeModule, RepositoryModule, AuthModule],
  controllers: [WalletController],
  providers: [
    WalletCreate
  ],
})
export class AppModule {}
