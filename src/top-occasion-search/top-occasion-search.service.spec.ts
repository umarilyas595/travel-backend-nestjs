import { Test, TestingModule } from '@nestjs/testing';
import { TopOccasionSearchService } from './top-occasion-search.service';

describe('TopOccasionSearchService', () => {
  let service: TopOccasionSearchService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TopOccasionSearchService],
    }).compile();

    service = module.get<TopOccasionSearchService>(TopOccasionSearchService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
