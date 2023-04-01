import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { AuthController } from './auth.controller.';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local-strategy';
import { JwtStrategy } from './jwt.strategy';
import { User } from '@/repositories/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggedUser } from './logged-user.injection';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '600s' },
    }),
    TypeOrmModule.forFeature([User])
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy, LoggedUser],
  exports: [AuthService, TypeOrmModule, LoggedUser],
})
export class AuthModule {}