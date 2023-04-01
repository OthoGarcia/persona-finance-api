export interface IUser extends IUserInput {
  id: number
}

export interface IUserInput {
  name?: string
  email: string
  password: string
}


export interface IUserFilter {
  id?: number
  name?: string
  email?: string
}