import { Test, TestingModule } from '@nestjs/testing';
import { G2plotController } from './g2plot.controller';

describe('G2plotController', () => {
  let controller: G2plotController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [G2plotController],
    }).compile();

    controller = module.get<G2plotController>(G2plotController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
