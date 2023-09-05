import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Put,
  Post,
  ConflictException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { PasswordUpdate, UserCreate, UserGet, UserUpdate } from './user.dtos';
import { UserService } from './user.service';
import { UserEntity } from './user.entity';
import { AuthService } from '../auth/auth.service';
import { Roles } from '../auth/roles.decorator';

@Controller('api/v1/users')
@ApiTags('users')
@ApiBearerAuth()
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Get()
  @Roles('admin')
  @ApiOkResponse({ type: [UserGet] })
  @ApiForbiddenResponse()
  async getAll() {
    const users = await this.userService.getAll();
    const dtos = users.map((user) => this.userEntityToDto(user));
    return dtos;
  }

  @Get(':id')
  @ApiOkResponse({ type: UserGet })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async get(@Param('id', ParseUUIDPipe) id: string) {
    await this.ensureIsAdminOrSameUser(id);

    const result = await this.userService.getById(id);

    if (!result) {
      throw new NotFoundException();
    }

    return this.userEntityToDto(result);
  }

  @Post()
  @Roles('admin')
  @ApiCreatedResponse({ type: UserGet })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async create(@Body() body: UserCreate) {
    const userCreate = {
      username: body.username,
      roles: body.roles,
    };
    const result = await this.userService.create(userCreate, body.password);

    if (!result) {
      throw new ConflictException();
    }

    return this.userEntityToDto(result);
  }

  @Put(':id')
  @ApiOkResponse({ type: UserGet })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async put(@Param('id', ParseUUIDPipe) id: string, @Body() body: UserUpdate) {
    await this.ensureIsAdminOrSameUser(id);

    const result = await this.userService.update(id, body);

    if (!result) {
      throw new NotFoundException();
    }

    return this.userEntityToDto(result);
  }

  @Delete(':id')
  @ApiOkResponse()
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async delete(@Param('id', ParseUUIDPipe) id: string) {
    await this.ensureIsAdminOrSameUser(id);

    const result = await this.userService.delete(id);

    if (!result) {
      throw new NotFoundException();
    }
  }

  @Put(':id/password')
  @ApiOkResponse()
  @ApiBadRequestResponse()
  @ApiForbiddenResponse()
  async changePassword(@Param('id') id: string, @Body() body: PasswordUpdate) {
    await this.ensureIsAdminOrSameUser(id);

    const result = await this.userService.updatePassword(id, body.old, body.new);

    if (!result) {
      throw new BadRequestException();
    }
  }

  private userEntityToDto(user: UserEntity): UserGet {
    // Strip sensitive information.
    const dto = user as any;
    delete dto.passwordHash;
    return dto;
  }

  private async ensureIsAdminOrSameUser(id: string) {
    const currentUser = await this.authService.getCurrentUser();

    if (!currentUser.roles.includes('admin') && currentUser.id !== id) {
      throw new ForbiddenException();
    }
  }
}
