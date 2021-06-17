import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Entity } from 'typeorm';
import { Flavor } from './entities/flavor.entity';
import { Kaffee } from './entities/kaffee.entity';
import { KaffeeController } from './kaffee.controller';
import { KaffeeService } from './kaffee.service';

@Module({
  imports: [TypeOrmModule.forFeature([Kaffee, Flavor, Entity])],
  controllers: [KaffeeController],
  providers: [KaffeeService],
})
export class KaffeeModule {}
