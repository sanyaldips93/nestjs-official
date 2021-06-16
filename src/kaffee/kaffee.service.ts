import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateKaffeeDto } from './dto/createKaffee.dto';
import { UpdateKaffeeDto } from './dto/update-kaffee.dto';
import { Kaffee } from './entities/kaffee.entity';

@Injectable()
export class KaffeeService {
  private coffees: Kaffee[] = [
    {
      id: 1,
      name: 'Shipwreck Roast',
      brand: 'Buddy Brew',
      flavors: ['chocolate', 'vanilla'],
    },
  ];

  findAll() {
    return this.coffees;
  }

  findOne(id: string) {
    const kaffe = this.coffees.find((item) => item.id === +id);
    return kaffe ? kaffe : new NotFoundException(`Coffee #${id} not present`);
    // if not returning, just throw
  }

  create(createKaffeeDto: CreateKaffeeDto) {
    this.coffees.push(createKaffeeDto);
  }

  update(id: string, updateKaffeeDto: UpdateKaffeeDto) {
    const existingCoffee = this.findOne(id);
    if (existingCoffee) {
      // update the existing entity
    }
  }

  remove(id: string) {
    const coffeeIndex = this.coffees.findIndex((item) => item.id === +id);
    if (coffeeIndex >= 0) {
      this.coffees.splice(coffeeIndex, 1);
    }
  }
}
