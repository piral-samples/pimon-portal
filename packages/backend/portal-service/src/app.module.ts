import { Module } from '@nestjs/common';
import { UserController } from './user/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';
import { UserEntity } from './user/user.entity';
import { AuthModule } from './auth/auth.module';
import { SeedModule } from './seed/seed.module';
import { ProfileModule } from './profile/profile.module';
import { ProfileEntity } from './profile/profile.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: ':memory:',
      synchronize: true,
      entities: [UserEntity, ProfileEntity],
    }),
    UserModule,
    AuthModule,
    SeedModule,
    ProfileModule,
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class AppModule {}
