import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Put,
} from '@nestjs/common';
import { ProfileGet, ProfileUpdate } from './profile.dtos';
import { ApiBearerAuth, ApiForbiddenResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ProfileService } from './profile.service';
import { AuthService } from '../auth/auth.service';

@ApiTags('profiles')
@ApiBearerAuth()
@Controller('api/v1')
export class ProfileController {
  constructor(
    private readonly authService: AuthService,
    private readonly profileService: ProfileService,
  ) {}

  @Get('profiles')
  @ApiOkResponse({ type: [ProfileGet] })
  async getAll() {
    const profiles = await this.profileService.getAll();
    return profiles;
  }

  @Get('users/:id/profile')
  @ApiOkResponse({ type: ProfileGet })
  @ApiNotFoundResponse()
  async get(@Param('id', ParseUUIDPipe) id: string) {
    const result = await this.profileService.getByUserId(id);

    if (!result) {
      throw new NotFoundException();
    }

    return result;
  }

  @Put('users/:id/profile')
  @ApiOkResponse({ type: ProfileGet })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async put(@Param('id', ParseUUIDPipe) id: string, @Body() body: ProfileUpdate) {
    const result = await this.profileService.update(id, body);

    if (!result) {
      throw new NotFoundException();
    }

    return result;
  }
}
