import { IUserInput, IUser, IUserFilter } from "@/src/auth/interfaces/auth.interface";
import { AbstractRepository, EntityRepository, Repository } from "typeorm";
import UserRepository from "../../interfaces/user";
import { User } from "../entities/user.entity";

@EntityRepository(User)
export class UserTypeOrmRepository extends AbstractRepository<User> implements UserRepository{
  async save(user: IUserInput): Promise<IUser> {
	  return this.repository.save({...user})
  }

  findOne(filter: IUserFilter): Promise<IUser> {
	  const {
      id,
      email,
      name
    } = filter
    return this.repository.findOne(id, {
      where: [
        { email },
        { name }
      ]
    })
 }

 get target() { return 'User'}
}