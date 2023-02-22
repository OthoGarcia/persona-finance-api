import { IUserInput, IUser, IUserFilter } from "@/auth/interfaces/auth.interface";
import { AbstractRepository, EntityRepository, Repository } from "typeorm";
import UserRepository from "../../interfaces/user";
import { User } from "@/users/entities/user.entity";

@EntityRepository(User)
export class UserTypeOrmRepository extends AbstractRepository<User> implements UserRepository{
  async save(user: IUserInput): Promise<IUser> {
	  return this.repository.save({...user})
  }

  findOne(filter: IUserFilter): Promise<IUser | undefined> {
	  const {
      id,
      email
    } = filter
    return this.repository.findOne(id, {
      where: [
        { email }
      ]
    })
 }

 get target() { return 'User'}
}