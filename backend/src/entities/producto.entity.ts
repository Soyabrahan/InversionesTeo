import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Marca } from './marca.entity';
import { Tipo } from './tipo.entity';
import { Moneda } from './moneda.entity';

@Entity()
export class Producto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column({ nullable: true })
  descripcion?: string;

  @ManyToOne(() => Marca, { eager: true, nullable: true })
  @JoinColumn({ name: 'id_marca' })
  marca?: Marca;

  @ManyToOne(() => Tipo, { eager: true, nullable: true })
  @JoinColumn({ name: 'id_tipo' })
  tipo?: Tipo;

  @ManyToOne(() => Moneda, { eager: true })
  @JoinColumn({ name: 'id_tasa' })
  tasa: Moneda;

  @Column()
  categoria: string;

  @Column('decimal', { precision: 10, scale: 2 })
  precioDolar: number;

  @Column('decimal', { precision: 15, scale: 2 })
  precioBs: number;
}
