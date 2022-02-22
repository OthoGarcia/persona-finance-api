import { Injectable } from '@nestjs/common'
import UserRepository from '../interfaces/user'
import { maxBy } from 'lodash'
import { users } from './data/users'
import { IUser, IUserFilter } from '@/src/auth/interfaces/auth.interface'

@Injectable()
export class UserMemoryRepository implements UserRepository {
  private users: IUser[]
  constructor() {
    this.users = users
  }
  async save(user: IUser): Promise<IUser> {
    const lastId = maxBy(this.users, (u) => u.id)?.id || 0
    const newUser = {
      ...user,
      id: lastId + 1,
    }
    this.users.push(newUser)
    console.log(this.users)
    return new Promise((resolve) => resolve(newUser))
  }

  async findOne(filter: IUserFilter): Promise<IUser> {
    console.log(filter, this.users)
    const { id, name, email } = filter
    const user = this.users.find(
      u => u.id === id ||
      u.email === email ||
      u.name === name
    )
    return new Promise((resolve) => resolve(user))
  }
}
