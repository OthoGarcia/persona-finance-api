import { Repository } from "typeorm";
import UserRepository from "../../interfaces/user";
import { User } from "../entities/user.entity";

export class UserTypeOrmRepository extends Repository<User> implements UserRepository{
  
}