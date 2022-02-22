import { Global, Module } from '@nestjs/common'
import { TYPES } from '../utils/symbols';
import RepositoryTypeormFactory from '../repositories/factory/typeorm-repository';
import { UserTypeOrmRepository } from '../repositories/typeOrm/repositories/user';
import { WalletTypeOrmRepository } from '../repositories/typeOrm/repositories/wallet';

@Global()
@Module({
  imports: [],
  controllers: [],
  providers: [
    UserTypeOrmRepository,
    WalletTypeOrmRepository,
    {
      provide: TYPES.Repositories,
      useClass: RepositoryTypeormFactory,
    },
  ],
  exports: [TYPES.Repositories]
})
export class RepositoryTypeormModule {}