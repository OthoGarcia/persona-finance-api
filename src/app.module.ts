import { AuthRegisterService } from './domain/use-case/auth/register'
import { AuthController } from '@/src/controllers/auth'
import { Module } from '@nestjs/common'
import { JoiPipeModule } from 'nestjs-joi'
import { UserMemoryRepository } from './repositories/memory/user'
import RepositoryMemoryFactory from './repositories/factory/memory-repository'
import { TYPES } from './utils/symbols'
import { WalletMemoryRepository } from './repositories/memory/wallet'
import { WalletCreate } from './domain/use-case/wallet/create'
import { WalletController } from './controllers/wallet'

@Module({
  imports: [JoiPipeModule],
  controllers: [AuthController, WalletController],
  providers: [
    AuthRegisterService,
    WalletCreate,
    UserMemoryRepository,
    WalletMemoryRepository,
    {
      provide: TYPES.Repositories,
      useClass: RepositoryMemoryFactory,
    },
  ],
})
export class AppModule {}
