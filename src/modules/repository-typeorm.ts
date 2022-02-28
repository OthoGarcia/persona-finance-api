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
    useFactory: (connection: Connection) => connection.getCustomRepository(typeormRepository),
    inject: [TYPES.DatabaseConnection],
  }
}

@Global()
@Module({
  imports: [],
  controllers: [],
  providers: [
    { ...buildRpositoryInjection(UserTypeOrmRepository) },
    { ...buildRpositoryInjection(WalletTypeOrmRepository) },
    {
      provide: TYPES.Repositories,
      useClass: RepositoryTypeormFactory,
    },
    ...databaseProviders
  ],
  exports: [TYPES.Repositories, ...databaseProviders]
})
export class RepositoryTypeormModule {}