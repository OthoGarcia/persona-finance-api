import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '@/src/domain/use-case/auth/auth';
import { RegisterDTO } from '../../../DTOs/auth/register';
import { LoginDTO } from '@/src/DTOs/auth/login';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({usernameField: 'email'});
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.authService.login({email: username, password})
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}