import { Test, TestingModule } from '@nestjs/testing';
import { KaffeeService } from './kaffee.service';

describe('KaffeeService', () => {
  let service: KaffeeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KaffeeService],
    }).compile();

    service = module.get<KaffeeService>(KaffeeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
