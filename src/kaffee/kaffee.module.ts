import { Module } from '@nestjs/common';
import { KaffeeController } from './kaffee.controller';
import { KaffeeService } from './kaffee.service';

@Module({ controllers: [KaffeeController], providers: [KaffeeService] })
export class KaffeeModule {}
