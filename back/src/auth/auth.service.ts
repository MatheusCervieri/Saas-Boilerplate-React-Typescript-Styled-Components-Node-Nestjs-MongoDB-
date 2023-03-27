import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.userService.findOneByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      // Remove the password property from the user object
      delete user.password;
      return user;
    }
    return null;
  }

  async login(user: User) {
    const payload = this.createJwtPayload(user);
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  createJwtPayload(user: User) {
    return { email: user.email, sub: user._id };
  }

  async register(userData: any) {
    const user = await this.userService.createUser(userData);
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
