import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Producto } from '../entities/producto.entity';
import { ProductoService } from '../services/producto.service';
import { ProductoController } from '../controllers/producto.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Producto])],
  controllers: [ProductoController],
  providers: [ProductoService],
  exports: [TypeOrmModule],
})
export class ProductoModule {}
