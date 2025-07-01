import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Marca } from '../entities/marca.entity';
import { MarcaService } from '../services/marca.service';
import { MarcaController } from '../controllers/marca.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Marca])],
  controllers: [MarcaController],
  providers: [MarcaService],
  exports: [TypeOrmModule],
})
export class MarcaModule {}
