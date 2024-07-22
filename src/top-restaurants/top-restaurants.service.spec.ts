import { Test, TestingModule } from '@nestjs/testing';
import { TopRestaurantsService } from './top-restaurants.service';

describe('TopRestaurantsService', () => {
  let service: TopRestaurantsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TopRestaurantsService],
    }).compile();

    service = module.get<TopRestaurantsService>(TopRestaurantsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
