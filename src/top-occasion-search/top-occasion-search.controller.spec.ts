import { Test, TestingModule } from '@nestjs/testing';
import { TopOccasionSearchController } from './top-occasion-search.controller';
import { TopOccasionSearchService } from './top-occasion-search.service';

describe('TopOccasionSearchController', () => {
  let controller: TopOccasionSearchController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TopOccasionSearchController],
      providers: [TopOccasionSearchService],
    }).compile();

    controller = module.get<TopOccasionSearchController>(TopOccasionSearchController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
