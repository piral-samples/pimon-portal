import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { EntityCreate, EntityUpdate } from '../entities';
import { compare, genSalt, hash } from 'bcrypt';
import { passwordSaltRounds } from '../constants';
import { ProfileService } from '../profile/profile.service';

type UserEntityCreate = Omit<EntityCreate<UserEntity>, 'passwordHash' | 'passwordSalt'>;
type UserEntityUpdate = Omit<EntityUpdate<UserEntity>, 'passwordHash' | 'passwordSalt'>;

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    @InjectRepository(UserEntity) private readonly usersRepository: Repository<UserEntity>,
    private readonly profileService: ProfileService,
  ) {}

  async getAll() {
    return await this.usersRepository.find();
  }

  async getById(id: string) {
    return await this.usersRepository.findOneBy({ id });
  }

  async getByUsername(username: string) {
    return await this.usersRepository.findOneBy({ username });
  }

  async create(user: UserEntityCreate, password: string) {
    const passwordHash = await this.hashPassword(password);
    const userWithPw = {
      ...user,
      passwordHash,
    } as UserEntity;

    const result = await this.usersRepository.insert(userWithPw);

    if (!result.identifiers.length) {
      this.logger.error(`Create failed for user ${user.username}: DB access failed.`);
      return undefined;
    }

    const id = result.identifiers[0].id;
    this.logger.log(`Created new user ${id}.`);

    this.logger.log(`Creating profile for user ${id}.`);
    await this.profileService.create({ userId: id, favoritePokemon: [], badges: [] });

    return await this.getById(id);
  }

  async update(id: string, user: UserEntityUpdate) {
    const result = await this.usersRepository.update(id, user);

    if (!result.affected) {
      this.logger.error(`Update failed for user ${id}: DB access failed.`);
      return undefined;
    }

    this.logger.log(`Update succeeded for user ${id}.`);
    return await this.getById(id);
  }

  async updatePassword(id: string, oldPassword: string, newPassword: string) {
    const user = await this.getById(id);

    if (!user) {
      this.logger.log(`Password change failed for user ${id}: User not found.`);
      return false;
    }

    if (!(await this.verifyPassword(user, oldPassword))) {
      this.logger.log(`Password change failed for user ${id}: Old password doesn't match current.`);
      return false;
    }

    const passwordHash = await this.hashPassword(newPassword);
    const result = await this.usersRepository.update(id, { passwordHash });
    const success = !!result.affected;

    if (!success) {
      this.logger.error(`Password change failed for user ${id}: DB access failed.`);
      return false;
    }

    this.logger.log(`Password change succeeded for user ${id}.`);
    return true;
  }

  async delete(id: string) {
    this.logger.log(`Deleting profile for user ${id}.`);
    await this.profileService.delete(id);

    const result = await this.usersRepository.delete(id);
    const success = !!result.affected;

    if (!success) {
      this.logger.error(`Delete failed for user ${id}: DB access failed.`);
      return false;
    }

    this.logger.log(`Delete succeeded for user ${id}.`);
    return true;
  }

  async verifyPassword(user: UserEntity, password: string) {
    return await compare(password, user.passwordHash);
  }

  private async hashPassword(pw: string | Buffer) {
    const salt = await genSalt(passwordSaltRounds);
    return await hash(pw, salt);
  }
}
