import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Marca } from '../entities/marca.entity';

@Injectable()
export class MarcaService {
  constructor(
    @InjectRepository(Marca)
    private readonly marcaRepository: Repository<Marca>,
  ) {}

  create(data: Partial<Marca>) {
    const marca = this.marcaRepository.create(data);
    return this.marcaRepository.save(marca);
  }

  findAll() {
    return this.marcaRepository.find();
  }

  findOne(id: number) {
    return this.marcaRepository.findOne({ where: { id } });
  }

  update(id: number, data: Partial<Marca>) {
    return this.marcaRepository.update(id, data);
  }

  remove(id: number) {
    return this.marcaRepository.delete(id);
  }
}
