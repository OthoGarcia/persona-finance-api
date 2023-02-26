import { IUserInput, IUser, IUserFilter } from "@/auth/interfaces/auth.interface";
import { DataSource, EntityRepository, InsertResult, Repository, SaveOptions } from "typeorm";
import UserRepository from "../../interfaces/user";
import { Inject } from "@nestjs/common";
import { TYPES } from "@/utils/symbols";
import { User } from "@/repositories/entities/user.entity";

export class UserTypeOrmRepository implements UserRepository{
  private repository: Repository<User>
  constructor(
    @Inject(TYPES.DATA_SOURCE) private dataSource: DataSource
  ) {
    this.repository = dataSource.getRepository(User)
  }

  async save(user: IUser): Promise<User> {
	  return this.repository.save({...user})
  }

  async insert(user: IUserInput): Promise<void> {
	  this.repository.insert({...user})
  }

  findOne(filter: IUserFilter): Promise<User | undefined> {
	  const {
      id,
      email
    } = filter
    return this.repository.findOne({
      where: [
        { email }
      ]
    })
 }

}