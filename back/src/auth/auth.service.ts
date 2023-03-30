import { ConflictException, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/user.schema';
import * as bcrypt from 'bcrypt';
import { UserDTO } from '../dto/user.dto';

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

  async login(user: UserDTO) {
    // Check if the user exists in the database
    const existingUser = await this.userService.findOneByEmail(user.email);
    if (!existingUser) {
      throw new ConflictException('Email is not registered.');
    }
    // Check if the password is correct
    const isPasswordCorrect = await bcrypt.compare(user.password, existingUser.password);
    console.log(user.password, existingUser.password, isPasswordCorrect);
    if (!isPasswordCorrect) {
      throw new ConflictException('Password is incorrect.');
    }
    // Remove the password property from the user object
    delete existingUser.password;
    // Create a JWT payload
    const payload = this.createJwtPayload(existingUser);
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  createJwtPayload(user: User) {
    return { email: user.email, sub: user._id };
  }

  async register(userData : UserDTO) {
     // Check if the email is already been used by another user. If it is, return an error message.
    const existingUser = await this.userService.findOneByEmail(userData.email);
    if (existingUser) {
      throw new ConflictException('Email is already in use.');
    }
    const user = await this.userService.createUser(userData);
    const payload = { email: user.email, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload, { secret: process.env.SECRET_JWT }),
    };
  }
}
