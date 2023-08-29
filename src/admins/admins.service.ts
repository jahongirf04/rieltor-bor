import { Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import PrismaService from '../prisma/prisma.service';

@Injectable()
export class AdminsService {
  constructor(private prismaService: PrismaService) {}

  async create(createAdminDto: CreateAdminDto) {
    const admin = await this.prismaService.admins.create({
      data: createAdminDto,
    });

    return admin;
  }

  async findAll() {
    const admins = await this.prismaService.admins.findMany();
    return admins;
  }

  async findOne(id: number) {
    return await this.prismaService.admins.findMany({ where: { id } });
  }

  async update(id: number, updateAdminDto: UpdateAdminDto) {
    return await this.prismaService.admins.update({
      where: {
        id,
      },
      data: updateAdminDto,
    });
  }

  async remove(id: number) {
    await this.prismaService.admins.delete({where: {id}})
    return "Deleted"
  }
}
