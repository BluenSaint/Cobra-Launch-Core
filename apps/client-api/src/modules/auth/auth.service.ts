import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from './users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (user && await bcrypt.compare(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.userId,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      }
    };
  }

  async register(userData: any) {
    // Check if user already exists
    const existingUser = await this.usersService.findByEmail(userData.email);
    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    
    // Create new user
    const newUser = await this.usersService.create({
      ...userData,
      password: hashedPassword,
    });

    // Return user without password
    const { password, ...result } = newUser;
    return result;
  }

  async validateOAuthUser(profile: any): Promise<any> {
    // Find user by OAuth provider and ID
    let user = await this.usersService.findByOAuthId(
      profile.provider,
      profile.id,
    );

    // If user doesn't exist, create a new one
    if (!user) {
      user = await this.usersService.createOAuthUser({
        email: profile.emails[0].value,
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        oauthProvider: profile.provider,
        oauthId: profile.id,
      });
    }

    return user;
  }
}
