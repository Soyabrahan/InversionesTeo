import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Query,
} from '@nestjs/common';
import { ProductoService } from '../services/producto.service';

@Controller('productos')
export class ProductoController {
  constructor(private readonly productoService: ProductoService) {}

  @Post()
  create(@Body() data: any) {
    return this.productoService.create(data);
  }

  @Get()
  findAll(
    @Query('categoria') categoria?: string,
    @Query('marca') marca?: string,
    @Query('tipo') tipo?: string,
    @Query('nombre') nombre?: string,
  ) {
    return this.productoService.findAll({ categoria, marca, tipo, nombre });
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.productoService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() data: any) {
    return this.productoService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.productoService.remove(id);
  }
}
