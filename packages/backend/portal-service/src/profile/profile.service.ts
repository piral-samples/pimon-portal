import { Injectable, Logger } from '@nestjs/common';
import { ProfileEntity } from './profile.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EntityCreate, EntityUpdate } from '../entities';

@Injectable()
export class ProfileService {
  private readonly logger = new Logger(ProfileService.name);

  constructor(@InjectRepository(ProfileEntity) private readonly profileRepository: Repository<ProfileEntity>) {}

  async getAll() {
    return await this.profileRepository.find();
  }

  async getByUserId(userId: string) {
    return await this.profileRepository.findOneBy({ userId });
  }

  async create(profile: EntityCreate<ProfileEntity>) {
    const result = await this.profileRepository.insert(profile);

    if (!result.identifiers.length) {
      this.logger.error(`Create failed for profile ${profile.userId}: DB access failed.`);
      return undefined;
    }

    this.logger.log(`Created new profile ${profile.userId}.`);
    return await this.getByUserId(result.identifiers[0].userId);
  }

  async update(userId: string, profile: EntityUpdate<ProfileEntity>) {
    const result = await this.profileRepository.update({ userId }, profile);

    if (!result.affected) {
      this.logger.error(`Update failed for profile ${userId}: DB access failed.`);
      return undefined;
    }

    this.logger.log(`Updated profile ${userId}.`);
    return await this.getByUserId(userId);
  }

  async delete(userId: string) {
    const result = await this.profileRepository.delete({ userId });
    const success = !!result.affected;

    if (!success) {
      this.logger.error(`Delete failed for profile ${userId}: DB access failed.`);
      return false;
    }

    this.logger.log(`Deleted profile ${userId}.`);
    return result.affected === 1;
  }
}
