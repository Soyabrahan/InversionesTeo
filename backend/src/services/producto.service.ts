import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Producto } from '../entities/producto.entity';
import { Moneda } from '../entities/moneda.entity';

@Injectable()
export class ProductoService {
  constructor(
    @InjectRepository(Producto)
    private readonly productoRepository: Repository<Producto>,
    @InjectRepository(Moneda)
    private readonly monedaRepository: Repository<Moneda>,
  ) {}

  async create(data: Partial<Producto>) {
    // Buscar la tasa correspondiente
    let tasa: Moneda | undefined;
    if (data.tasa && typeof data.tasa === 'object' && 'id' in data.tasa) {
      tasa = await this.monedaRepository.findOne({
        where: { id: (data.tasa as any).id },
      });
    } else if (typeof data.tasa === 'number') {
      tasa = await this.monedaRepository.findOne({ where: { id: data.tasa } });
    }
    if (!tasa) {
      throw new Error('No se encontró la tasa para calcular el precio en Bs');
    }
    // Calcular el precio en Bs
    const precioBs = Number(data.precioDolar) * Number(tasa.tasa);
    const producto = this.productoRepository.create({
      ...data,
      precioBs,
      tasa,
    });
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
