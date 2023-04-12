import { User } from "@/repositories/entities/user.entity";
import { FactoryProvider, Inject, Injectable, NotFoundException, Request, Scope, UseGuards } from "@nestjs/common";
import { REQUEST } from "@nestjs/core";
import { IUser } from "./interfaces/auth.interface";
import { JwtAuthGuard } from "./jwt-auth.guard";

interface RequestWithUser extends Request {
  user: {user: IUser}
}

@UseGuards(JwtAuthGuard)
@Injectable({ scope: Scope.REQUEST })
export class LoggedUser {
  constructor(@Inject(REQUEST) private readonly request: RequestWithUser) {}

  get user(): IUser{
    const { user } = this.request
    if (user)
      return user.user
    throw new NotFoundException()
  }
}