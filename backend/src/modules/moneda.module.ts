import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Moneda } from '../entities/moneda.entity';
import { MonedaService } from '../services/moneda.service';
import { MonedaController } from '../controllers/moneda.controller';
import { HttpModule } from '@nestjs/axios';
import { ScheduleModule } from '@nestjs/schedule';
import { Producto } from '../entities/producto.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Moneda, Producto]),
    HttpModule,
    ScheduleModule.forRoot(),
  ],
  controllers: [MonedaController],
  providers: [MonedaService],
  exports: [TypeOrmModule],
})
export class MonedaModule {}
