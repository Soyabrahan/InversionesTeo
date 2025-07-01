import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tipo } from '../entities/tipo.entity';

@Injectable()
export class TipoService {
  constructor(
    @InjectRepository(Tipo)
    private readonly tipoRepository: Repository<Tipo>,
  ) {}

  create(data: Partial<Tipo>) {
    const tipo = this.tipoRepository.create(data);
    return this.tipoRepository.save(tipo);
  }

  findAll() {
    return this.tipoRepository.find();
  }

  findOne(id: number) {
    return this.tipoRepository.findOne({ where: { id } });
  }

  update(id: number, data: Partial<Tipo>) {
    return this.tipoRepository.update(id, data);
  }

  remove(id: number) {
    return this.tipoRepository.delete(id);
  }
}
