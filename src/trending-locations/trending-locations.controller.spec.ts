import { Test, TestingModule } from '@nestjs/testing';
import { TrendingLocationsController } from './trending-locations.controller';
import { TrendingLocationsService } from './trending-locations.service';

describe('TrendingLocationsController', () => {
  let controller: TrendingLocationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TrendingLocationsController],
      providers: [TrendingLocationsService],
    }).compile();

    controller = module.get<TrendingLocationsController>(TrendingLocationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
