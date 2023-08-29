import { Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import PrismaService from '../prisma/prisma.service';

@Injectable()
export class CompaniesService {
  constructor(private prismaService: PrismaService) {}

  async create(createAdminDto: CreateCompanyDto) {
    const admin = await this.prismaService.companies.create({
      data: createAdminDto,
    });

    return admin;
  }

  async findAll() {
    const companies = await this.prismaService.companies.findMany();
    return companies;
  }

  async findOne(id: number) {
    return await this.prismaService.companies.findMany({ where: { id } });
  }

  async update(id: number, updateAdminDto: UpdateCompanyDto) {
    return await this.prismaService.companies.update({
      where: {
        id,
      },
      data: updateAdminDto,
    });
  }

  async remove(id: number) {
    await this.prismaService.companies.delete({ where: { id } });
    return 'Deleted';
  }
}
