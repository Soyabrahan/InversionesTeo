import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Producto } from '../entities/producto.entity';

@Injectable()
export class ProductoService {
  constructor(
    @InjectRepository(Producto)
    private readonly productoRepository: Repository<Producto>,
  ) {}

  create(data: Partial<Producto>) {
    const producto = this.productoRepository.create(data);
    return this.productoRepository.save(producto);
  }

  findAll() {
    return this.productoRepository.find();
  }

  findOne(id: number) {
    return this.productoRepository.findOne({ where: { id } });
  }

  update(id: number, data: Partial<Producto>) {
    return this.productoRepository.update(id, data);
  }

  remove(id: number) {
    return this.productoRepository.delete(id);
  }
}
