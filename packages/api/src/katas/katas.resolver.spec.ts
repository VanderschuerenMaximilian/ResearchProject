import { Test, TestingModule } from '@nestjs/testing';
import { KatasResolver } from './katas.resolver';
import { KatasService } from './katas.service';

describe('KatasResolver', () => {
  let resolver: KatasResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KatasResolver, KatasService],
    }).compile();

    resolver = module.get<KatasResolver>(KatasResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
