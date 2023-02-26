import { Injectable } from '@nestjs/common'
import UserRepository from '../interfaces/user'
import { maxBy } from 'lodash'
import { users } from './data/users'
import { IUser, IUserFilter } from '@/auth/interfaces/auth.interface'
import { User } from '../entities/user.entity'

@Injectable()
export class UserMemoryRepository implements UserRepository {
  private users: IUser[]
  constructor() {
    this.users = users
  }
  async save(user: IUser): Promise<User> {
    const lastId = maxBy(this.users, (u) => u.id)?.id || 0
    const newUser = {
      ...user,
      id: lastId + 1,
    }
    this.users.push(newUser)
    return new Promise((resolve) => resolve( new User(newUser)))
  }

  async findOne(filter: IUserFilter): Promise<User | undefined> {
    const { id, name, email } = filter
    const user = this.users.find(
      u => u.id === id ||
      u.email === email ||
      u.name === name
    )
    return new Promise((resolve) => {
      if (user === undefined) {
        resolve(undefined)
      }
      resolve(new User(user))
        
    })
  }
}
