import { Module } from '@nestjs/common'
import { AuthService } from '@/src/domain/use-case/auth/auth'
import { LocalStrategy } from '@/src/domain/use-case/auth/local-strategy'
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '@/src/domain/use-case/auth/constants';
import { AuthController } from '../controllers/auth';
import { JwtStrategy } from '../domain/use-case/auth/jwt.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}