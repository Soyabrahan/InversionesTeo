import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Moneda } from '../entities/moneda.entity';
import { HttpService } from '@nestjs/axios';
import { Cron } from '@nestjs/schedule';
import { Producto } from '../entities/producto.entity';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class MonedaService {
  constructor(
    @InjectRepository(Moneda)
    private readonly monedaRepository: Repository<Moneda>,
    @InjectRepository(Producto)
    private readonly productoRepository: Repository<Producto>,
    private readonly httpService: HttpService,
  ) {}

  create(data: Partial<Moneda>) {
    const moneda = this.monedaRepository.create(data);
    return this.monedaRepository.save(moneda);
  }

  findAll() {
    return this.monedaRepository.find();
  }

  findOne(id: number) {
    return this.monedaRepository.findOne({ where: { id } });
  }

  async update(id: number, data: Partial<Moneda>) {
    // Obtener la tasa anterior
    const monedaAnterior = await this.monedaRepository.findOne({
      where: { id },
    });
    const result = await this.monedaRepository.update(id, data);
    // Si la tasa fue actualizada y realmente cambió, recalcular los precios de los productos que usan esta tasa
    if (
      data.tasa !== undefined &&
      monedaAnterior &&
      Number(data.tasa) !== Number(monedaAnterior.tasa)
    ) {
      const moneda = await this.monedaRepository.findOne({ where: { id } });
      if (moneda) {
        const productos = await this.productoRepository.find({
          where: { tasa: { id: moneda.id } },
          relations: ['tasa'],
        });
        for (const producto of productos) {
          producto.precioBs =
            Number(producto.precioDolar) * Number(moneda.tasa);
          await this.productoRepository.save(producto);
        }
      }
    }
    return result;
  }

  remove(id: number) {
    return this.monedaRepository.delete(id);
  }

  @Cron('0 */6 * * *') // Cada 6 horas
  async actualizarTasaBCV() {
    try {
      const url = 'https://pydolarve.org/api/v2/dollar';
      const response$ = this.httpService.get(url);
      const response = await lastValueFrom(response$);
      const data = response.data;
      if (
        data &&
        data.monitors &&
        data.monitors.bcv &&
        data.monitors.bcv.price
      ) {
        const nuevaTasa = parseFloat(data.monitors.bcv.price);
        // Buscar la moneda BCV
        let bcv = await this.monedaRepository.findOne({
          where: { nombre: 'bcv' },
        });
        if (bcv) {
          bcv.tasa = nuevaTasa;
          await this.monedaRepository.save(bcv);
        } else {
          // Si no existe, la crea
          bcv = this.monedaRepository.create({
            nombre: 'bcv',
            tasa: nuevaTasa,
          });
          await this.monedaRepository.save(bcv);
        }
        // Recalcular precios en Bs de todos los productos que usan BCV
        const productos = await this.productoRepository.find({
          where: { tasa: { id: bcv.id } },
          relations: ['tasa'],
        });
        for (const producto of productos) {
          producto.precioBs = Number(producto.precioDolar) * nuevaTasa;
          await this.productoRepository.save(producto);
        }
      }
    } catch (error) {
      console.error('Error actualizando tasa BCV:', error);
    }
  }

  async actualizarTasaBCVManual() {
    try {
      const url = 'https://pydolarve.org/api/v2/dollar';
      const response$ = this.httpService.get(url);
      const response = await lastValueFrom(response$);
      const data = response.data;
      if (
        data &&
        data.monitors &&
        data.monitors.bcv &&
        data.monitors.bcv.price
      ) {
        const nuevaTasa = parseFloat(data.monitors.bcv.price);
        let bcv = await this.monedaRepository.findOne({ where: { id: 1 } });
        if (bcv) {
          bcv.tasa = nuevaTasa;
          await this.monedaRepository.save(bcv);
        } else {
          bcv = this.monedaRepository.create({
            id: 1,
            nombre: 'bcv',
            tasa: nuevaTasa,
          });
          await this.monedaRepository.save(bcv);
        }
        // Recalcular precios en Bs de todos los productos que usan esta tasa
        const productos = await this.productoRepository.find({
          where: { tasa: { id: bcv.id } },
          relations: ['tasa'],
        });
        for (const producto of productos) {
          producto.precioBs = Number(producto.precioDolar) * nuevaTasa;
          await this.productoRepository.save(producto);
        }
        return bcv;
      } else {
        throw new Error('Tasa BCV no encontrada en la respuesta JSON');
      }
    } catch (error) {
      console.error('Error actualizando tasa BCV:', error);
      throw error;
    }
  }
}
