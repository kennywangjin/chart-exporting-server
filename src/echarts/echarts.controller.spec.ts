import { Test, TestingModule } from '@nestjs/testing';
import { EChartsController } from './echarts.controller';

describe('EchartsController', () => {
  let controller: EChartsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EChartsController],
    }).compile();

    controller = module.get<EChartsController>(EChartsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
