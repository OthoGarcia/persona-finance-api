import { IUser, IUserInput } from "@/src/domain/entities/interfaces/user";

export default interface UserRepository {
  save(user: IUserInput): Promise<IUser>
}
