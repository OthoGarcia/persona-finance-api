import { AuthService } from '../domain/use-case/auth/auth'
import { Body, Controller, Get, HttpCode, Post, Request, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiSecurity, ApiTags } from '@nestjs/swagger'
import { RegisterDTO } from '@/src/DTOs/auth/register'
import { LoginDTO } from '../DTOs/auth/login'
import { LocalAuthGuard } from '../domain/use-case/auth/local-auth.guard'
import { JwtAuthGuard } from '../domain/use-case/auth/jwt-auth.guard'
@Controller('auth')
export class AuthController {
  constructor(readonly authService: AuthService) {}

  @ApiTags('auth')
  @Post('/register')
  @HttpCode(204)
  async register(@Body() registerDto: RegisterDTO): Promise<void> {
    await this.authService.registerUser(registerDto)
  }

  @ApiTags('auth')
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req, @Body() login: LoginDTO) {
    return req.user
  }

  @ApiTags('auth')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
