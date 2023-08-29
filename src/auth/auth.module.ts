import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import {
  AcccessTokenStrategy,
  RefreshTokenCookieStrategy,
  RefreshTokenStrategy,
} from './strategies';
import { AccessTokenGuard } from '../common/guards';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [JwtModule.register({}), PrismaModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    AcccessTokenStrategy,
    RefreshTokenStrategy,
    RefreshTokenCookieStrategy,
    {
      provide: APP_GUARD,
      useClass: AccessTokenGuard
    }
  ],
})
export class AuthModule {}
