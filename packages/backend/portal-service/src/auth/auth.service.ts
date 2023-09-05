import { Inject, Injectable, Logger, Scope } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { REQUEST } from '@nestjs/core';
import { UserEntity } from '../user/user.entity';

@Injectable({ scope: Scope.REQUEST })
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    @Inject(REQUEST) private request: Request,
  ) {}

  async signIn(username: string, password: string) {
    const user = await this.userService.getByUsername(username);
    if (!user) {
      this.logger.log(`Sign-in attempt for user ${username} failed: User not found.`);
      return undefined;
    }

    if (!(await this.userService.verifyPassword(user, password))) {
      this.logger.log(`Sign-in attempt for user ${username} failed: Password mismatch.`);
      return undefined;
    }

    this.logger.log(`Sign-in attempt for user ${username} succeeded. Signing JWT.`);
    return this.jwtService.sign({
      sub: user.id,
      username: user.username,
      roles: user.roles,
    });
  }

  async getCurrentUser() {
    // This is set by the AuthGuard.
    const user = this.request['user'] as UserEntity;

    if (!user) {
      throw new Error('No user found for the current request.');
    }

    return user;
  }
}
