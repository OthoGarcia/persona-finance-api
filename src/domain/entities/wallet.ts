import { ApiProperty } from '@nestjs/swagger'
import { IUser } from './interfaces/user'
import { IWallet } from './interfaces/wallet'

export default class Wallet {
  @ApiProperty()
  id: number
  @ApiProperty()
  name: string

  constructor(wallet: IWallet) {
    const { id, name } = wallet
    this.id = id
    this.name = name
  }
}
