import { Module } from '@nestjs/common'
import { JoiPipeModule } from 'nestjs-joi'
import { AuthModule } from './auth/auth.module'
import { WalletService } from './wallet/wallet.service'
import { WalletController } from './wallet/wallet.controller'
import { ConfigModule } from '@nestjs/config'
import { CategoriesModule } from './categories/categories.module';
import { TypeOrmModule } from '@nestjs/typeorm'
import configuration, { getTypeormConfig } from '@/database/provider';

import { DataSource } from 'typeorm'
import { Wallet } from './repositories/entities/wallet'



@Module({
  imports: [
    ConfigModule.forRoot({load: [configuration]}),
    TypeOrmModule.forRoot(getTypeormConfig()),
    JoiPipeModule,
    AuthModule,
    CategoriesModule,
    TypeOrmModule.forFeature([Wallet])
  ],
  controllers: [WalletController],
  providers: [
    WalletService
  ],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
