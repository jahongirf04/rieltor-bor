import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RieltorsService } from './rieltors.service';
import { CreateRieltorDto } from './dto/create-rieltor.dto';
import { UpdateRieltorDto } from './dto/update-rieltor.dto';

@Controller('rieltors')
export class RieltorsController {
  constructor(private readonly rieltorsService: RieltorsService) {}

  @Post()
  create(@Body() createRieltorDto: CreateRieltorDto) {
    return this.rieltorsService.create(createRieltorDto);
  }

  @Get()
  findAll() {
    return this.rieltorsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rieltorsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRieltorDto: UpdateRieltorDto) {
    return this.rieltorsService.update(+id, updateRieltorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rieltorsService.remove(+id);
  }
}
