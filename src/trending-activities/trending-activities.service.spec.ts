import { Test, TestingModule } from '@nestjs/testing';
import { TrendingActivitiesService } from './trending-activities.service';

describe('TrendingActivitiesService', () => {
  let service: TrendingActivitiesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TrendingActivitiesService],
    }).compile();

    service = module.get<TrendingActivitiesService>(TrendingActivitiesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
