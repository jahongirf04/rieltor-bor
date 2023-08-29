import { Injectable } from '@nestjs/common';
import { CreateRieltorDto } from './dto/create-rieltor.dto';
import { UpdateRieltorDto } from './dto/update-rieltor.dto';
import PrismaService from '../prisma/prisma.service';

@Injectable()
export class RieltorsService {
  constructor(private prismaService: PrismaService) {}

  async create(createAdminDto: CreateRieltorDto) {
    const admin = await this.prismaService.rieltors.create({
      data: createAdminDto,
    });

    return admin;
  }

  async findAll() {
    const rieltors = await this.prismaService.rieltors.findMany();
    return rieltors;
  }

  async findOne(id: number) {
    return await this.prismaService.rieltors.findMany({ where: { id } });
  }

  async update(id: number, updateAdminDto: UpdateRieltorDto) {
    return await this.prismaService.rieltors.update({
      where: {
        id,
      },
      data: updateAdminDto,
    });
  }

  async remove(id: number) {
    await this.prismaService.rieltors.delete({ where: { id } });
    return 'Deleted';
  }
}
