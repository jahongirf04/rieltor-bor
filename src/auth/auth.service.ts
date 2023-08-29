import { BadRequestException, ForbiddenException, Injectable} from '@nestjs/common';
import {Response} from 'express'
import { AuthDto } from './dto/auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import PrismaService from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from "bcrypt"
import { JwtPayload, Tokens } from './types';
import { CreateAdminDto } from '../admins/dto';
import { CreateRieltorDto } from '../rieltors/dto/create-rieltor.dto';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}

  async signup(createRieltorDto: AuthDto, res: Response) {
    const candidate = await this.prismaService.rieltors.findUnique({
      where: {
        email: createRieltorDto.email
      },
    });
    if (candidate) {
      throw new BadRequestException('Bunday email mavjud');
    }
    const hashedPassword = await bcrypt.hash(createRieltorDto.password, 7);
    const newclients = await this.prismaService.clients.create({
      data: createRieltorDto,
    });
    const tokens = await this.getTokens(newclients.id, newclients.email);
    await this.updateRefreshTokenHash(newclients.id, tokens.refresh_token);
    res.cookie('refesh_token', tokens.refresh_token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    return tokens;
  }

  async signin(authDto: AuthDto, res: Response) {
    const { email, password } = authDto;
    const rieltors = await this.prismaService.rieltors.findUnique({
      where: {
        email: authDto.email,
      },
    });
    if (!rieltors) {
      throw new BadRequestException('Access denied');
    }
    const passwordMatches = await bcrypt.compare(password, rieltors.hashedPassword);
    if (!passwordMatches) {
      throw new ForbiddenException('Access denied');
    }

    const tokens = await this.getTokens(rieltors.id, rieltors.email);
    await this.updateRefreshTokenHash(rieltors.id, tokens.refresh_token);
    res.cookie('refesh_token', tokens.refresh_token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    return tokens;
  }

  async signout(clientsId: number, res: Response) {
    const clients = await this.prismaService.rieltors.updateMany({
      where: {
        id: clientsId,
        hashedRefreshToken: {
          not: null,
        },
      },
      data: {
        hashedRefreshToken: null,
      },
    });
    if (!clients) {
      throw new BadRequestException('Access denied');
    }
    res.clearCookie('refesh_token');
    return true;
  }

  async refreshTokens(
    clientsId: number,
    refreshToken: string,
    res: Response,
  ): Promise<Tokens> {
    const rieltors = await this.prismaService.rieltors.findUnique({
      where: {
        id: clientsId,
      },
    });

    if (!rieltors || !rieltors.hashedRefreshToken)
      throw new ForbiddenException('Access Denied');

    const rtMatches = await bcrypt.compare(
      refreshToken,
      rieltors.hashedRefreshToken,
    );
    if (!rtMatches) throw new ForbiddenException('Access Denied');

    const tokens = await this.getTokens(rieltors.id, rieltors.email);
    await this.updateRefreshTokenHash(rieltors.id, tokens.refresh_token);
    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    return tokens;
  }

  async getTokens(clientsId: number, email: string): Promise<Tokens> {
    const jwtPayload: JwtPayload = {
      sub: clientsId,
      email: email,
    };
    const [acccessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);
    return {
      access_token: acccessToken,
      refresh_token: refreshToken,
    };
  }

  async updateRefreshTokenHash(
    clientsId: number,
    refreshToken: string,
  ): Promise<void> {
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 7);
    await this.prismaService.rieltors.update({
      where: {
        id: clientsId,
      },
      data: {
        hashedRefreshToken: hashedRefreshToken,
      },
    });
  }
}
