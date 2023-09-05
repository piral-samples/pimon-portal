import { SetMetadata } from '@nestjs/common';

export const isPublicKey = 'isPublic';

/**
 * Declares the endpoint as public, i.e., it does not require authentication.
 * @see https://docs.nestjs.com/security/authentication#enable-authentication-globally
 */
export const Public = () => SetMetadata(isPublicKey, true);
