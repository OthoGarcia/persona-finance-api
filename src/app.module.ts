import { Module } from '@nestjs/common'
import { JoiPipeModule } from 'nestjs-joi'
import { WalletCreate } from './domain/use-case/wallet/create'
import { WalletController } from './controllers/wallet'
import { AuthModule } from './modules/auth'
import { RepositoryTypeormModule } from './modules/repository-typeorm'
import { RepositoryMemoryModule } from './modules/repository-memory'


const repositories = new Map()
repositories.set('MEMORY', RepositoryMemoryModule)
repositories.set('TYPEORM', RepositoryTypeormModule)
const connectionType = process.env.CONNECTION_TYPE || 'MEMORY'
const RepositoryModule = repositories.get(connectionType)
@Module({
  imports: [JoiPipeModule, RepositoryModule, AuthModule],
  controllers: [WalletController],
  providers: [
    WalletCreate
  ],
})
export class AppModule {}
