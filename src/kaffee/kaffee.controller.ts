import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { CreateKaffeeDto } from './dto/createKaffee.dto';
import { UpdateKaffeeDto } from './dto/update-kaffee.dto';
import { KaffeeService } from './kaffee.service';

@Controller('kaffee')
export class KaffeeController {
  constructor(private readonly coffeeService: KaffeeService) {}

  @Get()
  findAll(@Query() paginationQueryDto: PaginationQueryDto) {
    return this.coffeeService.findAll(paginationQueryDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.coffeeService.findOne(id);
  }

  @Post()
  create(@Body() createKaffeeDto: CreateKaffeeDto) {
    return this.coffeeService.create(createKaffeeDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateKaffeeDto: UpdateKaffeeDto) {
    return this.coffeeService.update(id, updateKaffeeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coffeeService.remove(id);
  }
}
