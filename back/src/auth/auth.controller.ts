import { Controller, Request, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // Local authentication
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  // JWT authentication
  @UseGuards(AuthGuard('jwt'))
  @Post('protected-route')
  async protectedRoute() {
    // Your protected route logic here
  }

  @Post('register')
  async register(@Request() req) {
    return this.authService.register(req.body);
  }
}