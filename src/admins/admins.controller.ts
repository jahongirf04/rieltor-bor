import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AdminsService } from './admins.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Adminlar')
@Controller('admins')
export class AdminsController {
  constructor(private readonly adminsService: AdminsService) {}

  @ApiOperation({ summary: 'Admin yaratish' })
  @Post()
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminsService.create(createAdminDto);
  }

  @ApiOperation({ summary: "Adminlarni ko'rish" })
  @ApiResponse({ status: 200, description: 'List of admins', type: Object })
  @Get()
  findAll() {
    return this.adminsService.findAll();
  }

  @ApiOperation({ summary: "Adminni ko'rish" })
  @ApiResponse({ status: 200, description: 'One admin', type: Object })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adminsService.findOne(+id);
  }

  @ApiOperation({ summary: 'Adminni yangilash' })
  @ApiResponse({ status: 200, description: 'Updated admin', type: Object })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminsService.update(+id, updateAdminDto);
  }

  @ApiOperation({ summary: "Adminni o'chirish" })
  @ApiResponse({ status: 200, description: "O'chirilgan admin", type: Object })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminsService.remove(+id);
  }
}
