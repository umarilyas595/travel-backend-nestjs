import { Test, TestingModule } from '@nestjs/testing';
import { TrendingActivitiesController } from './trending-activities.controller';
import { TrendingActivitiesService } from './trending-activities.service';

describe('TrendingActivitiesController', () => {
  let controller: TrendingActivitiesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TrendingActivitiesController],
      providers: [TrendingActivitiesService],
    }).compile();

    controller = module.get<TrendingActivitiesController>(TrendingActivitiesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
