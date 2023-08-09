import { SetMetadata } from '@nestjs/common';
import { UserRoles } from '../enum/roles.enum';

export const META_ROLES = 'roles';

export const RoleProtected = (...roles: UserRoles[]) => {
  return SetMetadata(META_ROLES, roles)
};