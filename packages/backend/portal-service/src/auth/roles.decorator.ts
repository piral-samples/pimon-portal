import { SetMetadata } from '@nestjs/common';

export const rolesKey = 'roles';

/**
 * Declares that the endpoint requires the specified user roles.
 * @param roles The required user role(s).
 * @see https://docs.nestjs.com/security/authorization#basic-rbac-implementation
 */
export const Roles = (...roles: Array<string>) => SetMetadata(rolesKey, roles);
