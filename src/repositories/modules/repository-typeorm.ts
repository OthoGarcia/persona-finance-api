import { databaseProviders } from '@/database/provider'
import { TYPES } from '@/utils/symbols'
import { Global, Module } from '@nestjs/common'
import RepositoryTypeormFactory from '../factory/typeorm-repository'
import { CategoryTypeOrmRepository } from '../typeOrm/repositories/category'
import { UserTypeOrmRepository } from '../typeOrm/repositories/user'
import { WalletTypeOrmRepository } from '../typeOrm/repositories/wallet'

@Global()
@Module({
  imports: [],
  controllers: [],
  providers: [
    UserTypeOrmRepository,
    WalletTypeOrmRepository,
    CategoryTypeOrmRepository,
    {
      provide: TYPES.Repositories,
      useClass: RepositoryTypeormFactory,
    },
    ...databaseProviders
  ],
  exports: [TYPES.Repositories, ...databaseProviders]
})
export class RepositoryTypeormModule {}