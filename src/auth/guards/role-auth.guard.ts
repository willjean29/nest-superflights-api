import { BadRequestException, CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { UserRoles } from "../../common/enum/roles.enum";
import { Request } from "express";
import { IUser } from "../../common/interfaces/user.interface";

@Injectable()
export class RoleAuthGuard implements CanActivate {
  constructor(private reflector: Reflector) { }
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const roles: UserRoles[] = this.reflector.get('roles', context.getHandler());
    if (!roles) {
      return true;
    }

    if (!roles) return true;
    if (!roles.length) return true;

    const request = context.switchToHttp().getRequest<Request>();
    const user = request.user as IUser;
    if (!user) {
      throw new BadRequestException('User not found');
    }

    for (const role of user.roles) {
      if (roles.includes(role)) {
        return true;
      }
    }
    throw new ForbiddenException(
      `User ${user.username} need a valid role: [${roles}]`,
    );
  }

}