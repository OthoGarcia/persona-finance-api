import { ApiProperty } from '@nestjs/swagger'
import { IUser } from '../../auth/interfaces/auth.interface'
import { IWallet } from '../../wallet/interfaces/wallet.interface'

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
