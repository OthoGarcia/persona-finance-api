export interface IUser extends IUserInput {
  id: number
}

export interface IUserInput {
  name?: string
  email: string
  password: string
}
