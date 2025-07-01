import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tipo } from '../entities/tipo.entity';
import { TipoService } from '../services/tipo.service';
import { TipoController } from '../controllers/tipo.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Tipo])],
  controllers: [TipoController],
  providers: [TipoService],
  exports: [TypeOrmModule],
})
export class TipoModule {}
