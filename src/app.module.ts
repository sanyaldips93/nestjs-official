import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KaffeeModule } from './kaffee/kaffee.module';

@Module({
  imports: [KaffeeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
