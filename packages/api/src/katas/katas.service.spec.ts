import { Test, TestingModule } from '@nestjs/testing';
import { KatasService } from './katas.service';

describe('KatasService', () => {
  let service: KatasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KatasService],
    }).compile();

    service = module.get<KatasService>(KatasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
