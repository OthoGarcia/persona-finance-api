import { IUser, IUserFilter, IUserInput } from "@/auth/interfaces/auth.interface";

export default interface UserRepository {
  save(user: IUserInput): Promise<IUser>
  findOne(filter: IUserFilter): Promise<IUser>
}
