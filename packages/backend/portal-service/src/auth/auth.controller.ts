import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { ApiBadRequestResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { SignInPost } from './auth.dtos';
import { Public } from './public.decorator';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  @Public()
  @ApiOkResponse()
  @ApiBadRequestResponse()
  async signIn(@Body() { username, password }: SignInPost) {
    const jwt = await this.authService.signIn(username, password);

    if (!jwt) {
      throw new BadRequestException();
    }

    return {
      token_type: 'Bearer',
      access_token: jwt,
    };
  }
}
