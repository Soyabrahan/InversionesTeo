import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { MonedaService } from '../services/moneda.service';

@Controller('monedas')
export class MonedaController {
  constructor(private readonly monedaService: MonedaService) {}

  @Post()
  create(@Body() data: any) {
    return this.monedaService.create(data);
  }

  @Get()
  findAll() {
    return this.monedaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.monedaService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() data: any) {
    return this.monedaService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.monedaService.remove(id);
  }

  @Put('bcv/actualizar')
  @HttpCode(200)
  async actualizarBCV() {
    const nueva = await this.monedaService.actualizarTasaBCVManual();
    return nueva;
  }
}
