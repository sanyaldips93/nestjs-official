import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Flavor } from './flavor.entity';

@Entity() // sql table = kaffee by default
export class Kaffee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  brand: string;

  @Column({ default: 0 })
  recommendations: number;

  @JoinTable() // only the owner side does this
  @ManyToMany(() => Flavor, (flavor) => flavor.kaffees, {
    cascade: true, // 👈 or optionally just insert or update ['insert']
  })
  flavors: Flavor[];
}
