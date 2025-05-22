import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { AdminService } from '../admin.service';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private readonly adminService: AdminService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const userId = request.user?.id;

    if (!userId) {
      return false;
    }

    return this.adminService.isAdmin(userId);
  }
}
