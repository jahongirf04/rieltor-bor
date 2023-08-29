import { Injectable } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import PrismaService from '../prisma/prisma.service';

@Injectable()
export class ClientsService {
  constructor(private prismaService: PrismaService) {}

  async create(createAdminDto: CreateClientDto) {
    const admin = await this.prismaService.clients.create({
      data: createAdminDto,
    });

    return admin;
  }

  async findAll() {
    const clients = await this.prismaService.clients.findMany();
    return clients;
  }

  async findOne(id: number) {
    return await this.prismaService.clients.findMany({ where: { id } });
  }

  async update(id: number, updateAdminDto: UpdateClientDto) {
    return await this.prismaService.clients.update({
      where: {
        id,
      },
      data: updateAdminDto,
    });
  }

  async remove(id: number) {
    await this.prismaService.clients.delete({ where: { id } });
    return 'Deleted';
  }
}
