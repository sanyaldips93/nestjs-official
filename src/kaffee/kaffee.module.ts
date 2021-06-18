import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from 'src/events/entities/event.entity';
import { Flavor } from './entities/flavor.entity';
import { Kaffee } from './entities/kaffee.entity';
import { KaffeeController } from './kaffee.controller';
import { KaffeeService } from './kaffee.service';

@Module({
  imports: [TypeOrmModule.forFeature([Kaffee, Flavor, Event]), ConfigModule],
  controllers: [KaffeeController],
  providers: [KaffeeService],
})
export class KaffeeModule {}
