import { Test, TestingModule } from '@nestjs/testing';
import { WorldCoutriesCitiesController } from './world-coutries-cities.controller';
import { WorldCoutriesCitiesService } from './world-coutries-cities.service';

describe('WorldCoutriesCitiesController', () => {
  let controller: WorldCoutriesCitiesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WorldCoutriesCitiesController],
      providers: [WorldCoutriesCitiesService],
    }).compile();

    controller = module.get<WorldCoutriesCitiesController>(WorldCoutriesCitiesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
