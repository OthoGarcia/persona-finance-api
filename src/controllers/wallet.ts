import { AuthService } from '../domain/use-case/auth/auth'
import { Body, Controller, HttpCode, Post } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { WalletInputDTO } from '../DTOs/wallet/input'
import { WalletCreate } from '../domain/use-case/wallet/create'

@Controller('wallet')
export class WalletController {
  constructor(readonly walletCreate: WalletCreate) {}

  @ApiTags('wallet')
  @Post('')
  @HttpCode(204)
  async create(@Body() walletInputDTO: WalletInputDTO): Promise<void> {
    await this.walletCreate.create(walletInputDTO)
  }
}
