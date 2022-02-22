import User from "@/src/domain/entities/user";
import { Repository } from "typeorm";
import UserRepository from "../../interfaces/user";

export class UserTypeOrmRepository extends Repository<User> implements UserRepository{
  
}