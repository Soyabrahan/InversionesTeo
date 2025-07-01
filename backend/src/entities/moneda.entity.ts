import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Producto } from './producto.entity';

@Entity()
export class Moneda {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column('decimal', { precision: 15, scale: 6 })
  tasa: number;

  @OneToMany(() => Producto, (producto) => producto.tasa)
  productos: Producto[];
}
