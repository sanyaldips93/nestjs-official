import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { Event } from 'src/events/entities/event.entity';
import { Connection, Repository } from 'typeorm';
import { CreateKaffeeDto } from './dto/createKaffee.dto';
import { UpdateKaffeeDto } from './dto/update-kaffee.dto';
import { Flavor } from './entities/flavor.entity';
import { Kaffee } from './entities/kaffee.entity';

@Injectable()
export class KaffeeService {
  constructor(
    @InjectRepository(Kaffee)
    private readonly kaffeeRepository: Repository<Kaffee>,
    @InjectRepository(Flavor)
    private readonly flavorRepository: Repository<Flavor>,
    private readonly connection: Connection,
    private readonly configService: ConfigService,
  ) {}

  findAll(paginationQueryDto: PaginationQueryDto) {
    const { limit, offset } = paginationQueryDto;
    return this.kaffeeRepository.find({
      relations: ['flavors'],
      skip: offset,
      take: limit,
    });
  }

  async findOne(id: string) {
    const kaffe = await this.kaffeeRepository.findOne(id, {
      relations: ['flavors'],
    });
    if (!kaffe) throw new NotFoundException(`Kaffee ${id} is not found`);
    return kaffe;
  }

  async create(createKaffeeDto: CreateKaffeeDto) {
    const flavors = await Promise.all(
      createKaffeeDto.flavors.map((name) => this.preloadFlavorByName(name)),
    );

    const kaffee = this.kaffeeRepository.create({
      ...createKaffeeDto,
      flavors,
    });
    return this.kaffeeRepository.save(kaffee);
  }

  async update(id: string, updateKaffeeDto: UpdateKaffeeDto) {
    const flavors =
      updateKaffeeDto.flavors &&
      (await Promise.all(
        updateKaffeeDto.flavors.map((name) => this.preloadFlavorByName(name)),
      ));

    const coffee = await this.kaffeeRepository.preload({
      id: +id,
      ...updateKaffeeDto,
      flavors,
    });
    if (!coffee) {
      throw new NotFoundException(`Coffee #${id} not found`);
    }
    return this.kaffeeRepository.save(coffee);
  }

  async remove(id: string) {
    const coffee = await this.findOne(id);
    return this.kaffeeRepository.remove(coffee);
  }

  async recommendKaffee(kaffe: Kaffee) {
    const queryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      kaffe.recommendations++;

      const recommendEvent = new Event();
      recommendEvent.name = 'recommend_coffee';
      recommendEvent.type = 'coffee';
      recommendEvent.payload = { coffeeId: kaffe.id };

      await queryRunner.manager.save(kaffe);
      await queryRunner.manager.save(recommendEvent);

      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  private async preloadFlavorByName(name: string): Promise<Flavor> {
    const existingFlavor = await this.flavorRepository.findOne({ name });
    if (existingFlavor) {
      return existingFlavor;
    }
    return this.flavorRepository.create({ name });
  }
}
