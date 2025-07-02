import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { MarcaService } from '../services/marca.service';

@Controller('marcas')
export class MarcaController {
  constructor(private readonly marcaService: MarcaService) {}

  @Post()
  create(@Body() data: any) {
    return this.marcaService.create(data);
  }

  @Get()
  findAll() {
    return this.marcaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.marcaService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() data: any) {
    return this.marcaService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.marcaService.remove(id);
  }

  @Get('por-categoria/:categoria')
  findByCategoria(@Param('categoria') categoria: string) {
    return this.marcaService.findByCategoria(categoria);
  }
}
