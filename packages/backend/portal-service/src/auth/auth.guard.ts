import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { jwtSecret } from '../constants';
import { isPublicKey } from './public.decorator';
import { Reflector } from '@nestjs/core';
import { UserService } from '../user/user.service';

/**
 * Ensures that the user is authenticated.
 * @see https://docs.nestjs.com/security/authentication#implementing-the-authentication-guard
 */
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Endpoints explicitly marked as public are allowed to proceed always.
    const isPublic = this.reflector.getAllAndOverride<boolean>(isPublicKey, [context.getHandler(), context.getClass()]);

    if (isPublic) {
      return true;
    }

    // Non-public endpoints require a valid JWT.
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const { sub } = await this.jwtService.verifyAsync(token, { secret: jwtSecret });
      const user = await this.userService.getById(sub);
      request.user = user;
    } catch {
      throw new UnauthorizedException();
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
