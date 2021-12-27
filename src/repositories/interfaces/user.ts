import { IUser, IUserFilter, IUserInput } from "@/src/domain/entities/interfaces/user";

export default interface UserRepository {
  save(user: IUserInput): Promise<IUser>
  findOne(filter: IUserFilter): Promise<IUser>
}
