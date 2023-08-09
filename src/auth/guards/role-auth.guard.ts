import { BadRequestException, CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";

@Injectable()
export class RoleAuthGuard implements CanActivate {
  constructor(private reflector: Reflector) { }
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    console.log("RoleAuthGuard")
    console.log({ context: context.getHandler() });
    // const roles = this.reflector.get('roles', context.getHandler());
    const roles = this.reflector.get('roles', context.getHandler());
    console.log({ roles });
    console.log("sddsd")

    return true;
  }

}