import { Test, TestingModule } from '@nestjs/testing';
import { G2plotService } from './g2plot.service';

describe('G2plotService', () => {
  let service: G2plotService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [G2plotService],
    }).compile();

    service = module.get<G2plotService>(G2plotService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
