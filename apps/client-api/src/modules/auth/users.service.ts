import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  private readonly users = [];

  async findByEmail(email: string): Promise<any> {
    return this.users.find(user => user.email === email);
  }

  async findByOAuthId(provider: string, id: string): Promise<any> {
    return this.users.find(user => 
      user.oauthProvider === provider && user.oauthId === id
    );
  }

  async create(userData: any): Promise<any> {
    const userId = `user-${Date.now()}`;
    const newUser = {
      userId,
      ...userData,
      role: userData.role || 'user',
      createdAt: new Date(),
    };
    
    this.users.push(newUser);
    return newUser;
  }

  async createOAuthUser(userData: any): Promise<any> {
    const userId = `user-${Date.now()}`;
    const newUser = {
      userId,
      ...userData,
      role: 'user',
      createdAt: new Date(),
    };
    
    this.users.push(newUser);
    return newUser;
  }
}
