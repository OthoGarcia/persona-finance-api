import { Module } from '@nestjs/common'
import { JoiPipeModule } from 'nestjs-joi'
import { AuthModule } from './modules/auth'
import { WalletService } from './wallet/wallet.service'
import { WalletController } from './wallet/wallet.controller'
import { ConfigModule } from '@nestjs/config'
import configuration, { getRepositoryModule } from './config/configuration'




@Module({
  imports: [
    ConfigModule.forRoot({load: [configuration]}),
    JoiPipeModule,
    getRepositoryModule(),
    AuthModule
  ],
  controllers: [WalletController],
  providers: [
    WalletService
  ],
})
export class AppModule {}
