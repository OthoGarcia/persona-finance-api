import { AuthRegisterService } from './../domain/use-case/auth/register';
import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RegisterDTO } from './../DTOs/auth/register';

@Controller('auth')
export class AuthController {
  constructor(readonly authRegisterService: AuthRegisterService) {}

  @ApiTags('auth')
  @Post('/register')
  @HttpCode(204)
  register(@Body() registerDto: RegisterDTO): void {
    this.authRegisterService.registerUser(registerDto);
  }
}
