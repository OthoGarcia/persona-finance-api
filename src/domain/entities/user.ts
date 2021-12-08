import { ApiProperty } from '@nestjs/swagger';
import { IUser } from './interfaces/user';

export default class User {
  @ApiProperty()
  id: number;
  @ApiProperty()
  name?: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  password: string;

  constructor(user: IUser) {
    const { id, name, email, password } = user;
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
  }
}
