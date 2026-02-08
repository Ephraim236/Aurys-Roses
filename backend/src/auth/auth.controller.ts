import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('api/auth') // This makes the URL: /api/auth
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login') // This makes the final URL: /api/auth/login
  @HttpCode(HttpStatus.OK)
  login(@Body() body: any) {
    console.log('Login request received for:', body.email);
    return this.authService.login(body.email, body.password);
  }

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  signup(@Body() body: any) {
    return this.authService.signup(body.email, body.password);
  }
}