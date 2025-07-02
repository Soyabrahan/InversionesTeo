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

  // Recibe un objeto de filtros y aplica los filtros usando TypeORM
  async findAll(
    filtros: {
      categoria?: string;
      marca?: string;
      tipo?: string;
      nombre?: string;
    } = {},
  ) {
    const query = this.productoRepository
      .createQueryBuilder('producto')
      .leftJoinAndSelect('producto.marca', 'marca')
      .leftJoinAndSelect('producto.tipo', 'tipo')
      .leftJoinAndSelect('producto.tasa', 'tasa');

    if (filtros.categoria) {
      query.andWhere('producto.categoria = :categoria', {
        categoria: filtros.categoria,
      });
    }
    if (filtros.marca) {
      query.andWhere('marca.id = :marca', { marca: filtros.marca });
    }
    if (filtros.tipo) {
      query.andWhere('tipo.id = :tipo', { tipo: filtros.tipo });
    }
    if (filtros.nombre) {
      query.andWhere('LOWER(producto.nombre) LIKE :nombre', {
        nombre: `%${filtros.nombre.toLowerCase()}%`,
      });
    }

    return query.getMany();
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
