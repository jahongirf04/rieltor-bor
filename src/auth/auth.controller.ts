import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import {Response} from 'express'
import { GetCurrentUser, GetCurrentUserId, Public } from '../common/decorators';
import { RefreshTokenGuard } from '../common/guards';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: "Ro'yhatdan o'tish" })
  @ApiResponse({
    status: 200,
    description: "Ro'yhatdan o'tdingiz",
    type: Object,
  })
  @Public()
  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  async signup(
    @Body() authDto: AuthDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.signup(authDto, res);
  }

  @ApiOperation({ summary: 'Kirish' })
  @ApiResponse({
    status: 200,
    description: 'token',
    type: Object,
  })
  @Public()
  @Post('signin')
  @HttpCode(HttpStatus.OK)
  async signin(
    @Body() authDto: AuthDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.signin(authDto, res);
  }

  @ApiOperation({ summary: 'Chiqish' })
  @ApiResponse({
    status: 200,
    description: 'Chiqdingiz',
    type: String,
  })
  @Public()
  @Post('signout')
  @HttpCode(HttpStatus.OK)
  async signout(
    @GetCurrentUserId() userId: number,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.signout(userId, res);
  }

  @ApiOperation({ summary: "Tokenni yangilash" })
  @ApiResponse({
    status: 200,
    description: "TOken yangilandi",
    type: Object,
  })
  @Public()
  @UseGuards(RefreshTokenGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refreshTokens(
    @GetCurrentUserId() userId: number,
    @GetCurrentUser('refreshToken') refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.refreshTokens(userId, refreshToken, res);
  }
}
