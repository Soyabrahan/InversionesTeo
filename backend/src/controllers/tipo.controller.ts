import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { TipoService } from '../services/tipo.service';

@Controller('tipos')
export class TipoController {
  constructor(private readonly tipoService: TipoService) {}

  @Post()
  create(@Body() data: any) {
    return this.tipoService.create(data);
  }

  @Get()
  findAll() {
    return this.tipoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.tipoService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() data: any) {
    return this.tipoService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.tipoService.remove(id);
  }
}
