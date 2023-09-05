import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';
import { RolesGuard } from './roles.guard';
import { AuthGuard } from './auth.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: 'nosecret',
      signOptions: { expiresIn: '1d' },
    }),
    forwardRef(() => UserModule),
  ],
  providers: [
    AuthService,
    AuthGuard,
    RolesGuard,

    // Registers the AuthGuard and RolesGuard globally, i.e., enables them by default.
    // See, for example:: https://docs.nestjs.com/security/authentication#enable-authentication-globally
    { provide: APP_GUARD, useClass: AuthGuard },
    { provide: APP_GUARD, useClass: RolesGuard },
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
