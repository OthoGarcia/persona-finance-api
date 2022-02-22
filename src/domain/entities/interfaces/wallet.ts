import { IUser } from "./user";

export interface IWallet extends IWalletInput {
  id: number
}

export interface IWalletInput {
  name?: string
}
