import { TYPES } from '@/utils/symbols';
import { Global, Module } from '@nestjs/common'
import RepositoryMemoryFactory from '../factory/memory-repository';
import { CategoryMemoryRepository } from '../memory/category';
import { UserMemoryRepository } from '../memory/user';
import { WalletMemoryRepository } from '../memory/wallet';

@Global()
@Module({
  imports: [],
  controllers: [],
  providers: [
    UserMemoryRepository,
    WalletMemoryRepository,
    CategoryMemoryRepository,
    {
      provide: TYPES.Repositories,
      useClass: RepositoryMemoryFactory,
    },
  ],
  exports: [TYPES.Repositories]
})
export class RepositoryMemoryModule {}