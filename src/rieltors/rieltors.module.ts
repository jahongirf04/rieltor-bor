import { Module } from '@nestjs/common';
import { RieltorsService } from './rieltors.service';
import { RieltorsController } from './rieltors.controller';
import PrismaService from '../prisma/prisma.service';

@Module({
  controllers: [RieltorsController],
  providers: [RieltorsService, PrismaService],
})
export class RieltorsModule {}
