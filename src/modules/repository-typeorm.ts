import { Global, Module } from '@nestjs/common'
import { TYPES } from '../utils/symbols';
import RepositoryTypeormFactory from '../repositories/factory/typeorm-repository';
import { UserTypeOrmRepository } from '../repositories/typeOrm/repositories/user';
import { WalletTypeOrmRepository } from '../repositories/typeOrm/repositories/wallet';
import { databaseProviders } from '../database/provider';
import { Connection } from 'typeorm';

const buildRpositoryInjection = (typeormRepository) => {
  return {
    provide: typeormRepository,
    inject: [TYPES.DATA_SOURCE],
  }
}

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
    ...databaseProviders
  ],
  exports: [TYPES.Repositories, ...databaseProviders]
})
export class RepositoryTypeormModule {}