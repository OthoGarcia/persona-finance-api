import { AuthRegisterService } from './domain/use-case/auth/register';
import { AuthController } from '@/src/controllers/auth';
import { Module } from '@nestjs/common';
import { JoiPipeModule } from 'nestjs-joi';
import { UserMemoryRepository } from './repositories/memory/user';
import RepositoryMemoryFactory from './repositories/factory/memory-repository';
import { TYPES } from './utils/symbols';

@Module({
  imports: [JoiPipeModule],
  controllers: [AuthController],
  providers: [
    AuthRegisterService,
    UserMemoryRepository,
    {
      provide: TYPES.Repositories,
      useClass: RepositoryMemoryFactory,
    },
  ],
})
export class AppModule {}
