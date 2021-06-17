import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Kaffee } from './kaffee.entity';

@Entity()
export class Flavor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => Kaffee, (kaffee) => kaffee.flavors)
  kaffees: Kaffee[];
}
