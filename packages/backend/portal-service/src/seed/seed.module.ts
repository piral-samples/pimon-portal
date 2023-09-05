import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { UserModule } from '../user/user.module';
import { ProfileModule } from '../profile/profile.module';

@Module({
  imports: [UserModule, ProfileModule],
  providers: [SeedService],
})
export class SeedModule {}
