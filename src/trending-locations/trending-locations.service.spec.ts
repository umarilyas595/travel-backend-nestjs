import { Test, TestingModule } from '@nestjs/testing';
import { TrendingLocationsService } from './trending-locations.service';

describe('TrendingLocationsService', () => {
  let service: TrendingLocationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TrendingLocationsService],
    }).compile();

    service = module.get<TrendingLocationsService>(TrendingLocationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
