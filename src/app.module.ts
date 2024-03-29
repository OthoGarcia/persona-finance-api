import { Module } from '@nestjs/common'
import { JoiPipeModule } from 'nestjs-joi'
import { AuthModule } from './auth/auth.module'
import { WalletService } from './wallet/wallet.service'
import { WalletController } from './wallet/wallet.controller'
import { ConfigModule } from '@nestjs/config'
import configuration, { getRepositoryModule } from './config/configuration'
import { CategoriesModule } from './categories/categories.module';




@Module({
  imports: [
    ConfigModule.forRoot({load: [configuration]}),
    JoiPipeModule,
    getRepositoryModule(),
    AuthModule,
    CategoriesModule
  ],
  controllers: [WalletController],
  providers: [
    WalletService
  ],
})
export class AppModule {}
