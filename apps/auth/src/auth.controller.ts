import { Controller, Get, Body, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiResponse, ApiTags, ApiBody } from '@nestjs/swagger';
import { Public } from 'nest-keycloak-connect';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('auth')
@Controller()
@ApiBearerAuth()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  @ApiOperation({ summary: 'Return hello' })
  @ApiResponse({ status: 200, description: 'Say hello.' })
  getHello(): string {
    return this.authService.getHello();
  }

  @Post('login')
  @Public()
  @ApiOperation({ summary: 'Get user token' })
  @ApiResponse({ status: 200, description: 'Return user token.' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        username: { type: 'string' },
        password: { type: 'string' },
      },
    },
  })
  getUserToken(
    @Body('username') username: string,
    @Body('password') password: string,
  ): any {
    return this.authService.getUserToken(username, password);
  }

  @Get('userinfo')
  @ApiOperation({ summary: 'Get user info' })
  @ApiResponse({ status: 200, description: 'Return user info.' })
  getUserInfo(@Req() request): any {
    const accessToken = request.headers.authorization.split(' ')[1];
    return this.authService.getUserInfo(accessToken);
  }
}
