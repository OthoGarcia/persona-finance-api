import { AuthService } from './auth'
import { Body, Controller, HttpCode, Post } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { WalletInputDTO } from './DTO/input'
import { WalletService } from './wallet.service'

@Controller('wallet')
export class WalletController {
  constructor(readonly WalletService: WalletService) {}

  @ApiTags('wallet')
  @Post('')
  @HttpCode(204)
  async create(@Body() walletInputDTO: WalletInputDTO): Promise<void> {
    await this.WalletService.create(walletInputDTO)
  }
}
