import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth') // ✅ Keep it simple. main.ts adds the /api automatically.
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK) // Returns 200 instead of 201 (standard for login)
  login(@Body() body: { email: string; password: string }) {
    console.log('Login attempt at production for:', body.email);
    return this.authService.login(body.email, body.password);
  }

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  signup(@Body() body: { email: string; password: string }) {
    return this.authService.signup(body.email, body.password);
  }
}