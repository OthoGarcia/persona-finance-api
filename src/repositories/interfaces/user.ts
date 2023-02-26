import { IUser, IUserFilter, IUserInput } from "@/auth/interfaces/auth.interface";
import { User } from "../entities/user.entity";


export default interface UserRepository {
  save(user: IUser): Promise<User>
  findOne(filter: IUserFilter): Promise<User>
}
