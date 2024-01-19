import { Test, TestingModule } from '@nestjs/testing';
import { TechniquesResolver } from './techniques.resolver';
import { TechniquesService } from './techniques.service';

describe('TechniquesResolver', () => {
  let resolver: TechniquesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TechniquesResolver, TechniquesService],
    }).compile();

    resolver = module.get<TechniquesResolver>(TechniquesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
