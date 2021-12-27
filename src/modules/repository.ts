import { Global, Module } from '@nestjs/common'
import { UserMemoryRepository } from '../repositories/memory/user';
import { WalletMemoryRepository } from '../repositories/memory/wallet';
import { TYPES } from '../utils/symbols';
import RepositoryMemoryFactory from '../repositories/factory/memory-repository';

@Global()
@Module({
  imports: [],
  controllers: [],
  providers: [
    UserMemoryRepository,
    WalletMemoryRepository,
    {
      provide: TYPES.Repositories,
      useClass: RepositoryMemoryFactory,
    },
  ],
  exports: [TYPES.Repositories]
})
export class RepositoryModule {}