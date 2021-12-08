import { IUser, IUserInput } from '@/domain/entities/interfaces/user';

export default interface UserRepository {
  save(user: IUserInput): Promise<IUser>;
}
