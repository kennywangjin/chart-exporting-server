import { Test, TestingModule } from '@nestjs/testing';
import { EChartsService } from './echarts.service';

describe('EchartsService', () => {
  let service: EChartsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EChartsService],
    }).compile();

    service = module.get<EChartsService>(EChartsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
