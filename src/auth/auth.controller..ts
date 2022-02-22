import { AuthService } from '../wallet/auth'
import { Body, Controller, Get, HttpCode, Post, Request, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiSecurity, ApiTags } from '@nestjs/swagger'
import { RegisterDTO } from './DTO/register-user.dto'
import { LocalAuthGuard } from './local-auth.guard'
import { LoginDTO } from './DTO/login.dto'
import { JwtAuthGuard } from './jwt-auth.guard'
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
