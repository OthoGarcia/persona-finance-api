import { IUser } from '@/src/domain/entities/interfaces/user'
import { Injectable } from '@nestjs/common'
import UserRepository from '../interfaces/user'
import { maxBy } from 'lodash'

@Injectable()
export class UserMemoryRepository implements UserRepository {
  private users: IUser[]
  constructor() {
    this.users = []
  }
  async save(user: IUser): Promise<IUser> {
    const lastId = maxBy(this.users, (u) => u.id)?.id || 0
    const newUser = {
      ...user,
      id: lastId + 1,
    }
    this.users.push(newUser)
    console.log(this.users)
    return new Promise(() => newUser)
  }
}
