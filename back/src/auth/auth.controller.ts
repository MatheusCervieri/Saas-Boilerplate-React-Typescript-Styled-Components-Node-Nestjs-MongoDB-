import { Controller, Request, Post, UseGuards, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { UserInformationDTO } from 'src/dto/userInformation.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.body);
  }

  // JWT authentication
  @UseGuards(AuthGuard('jwt'))
  @Post('protected-route')
  async protectedRoute() {
    // Your protected route logic here
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('user-information')
  async getUserInformation(@Request() req) {
    const data : UserInformationDTO = {
      email : req.user.email,
    }
    return data; 

  }

  @Post('register')
  async register(@Request() req) {
    console.log('SECRET_JWT:', process.env.SECRET_JWT); 
    return this.authService.register(req.body);
  }
}