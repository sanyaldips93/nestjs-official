import { Test, TestingModule } from '@nestjs/testing';
import { KaffeeController } from './kaffee.controller';

describe('KaffeeController', () => {
  let controller: KaffeeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [KaffeeController],
    }).compile();

    controller = module.get<KaffeeController>(KaffeeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
