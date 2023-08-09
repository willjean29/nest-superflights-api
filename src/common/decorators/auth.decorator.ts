import { UseGuards, applyDecorators } from '@nestjs/common';
import { UserRoles } from '../enum/roles.enum';
import { RoleProtected } from './role-protected.decorator';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RoleAuthGuard } from '../../auth/guards/role-auth.guard';

export function Auth(...roles: UserRoles[]) {
  return applyDecorators(
    RoleProtected(...roles),
    UseGuards(JwtAuthGuard, RoleAuthGuard)
  );
}