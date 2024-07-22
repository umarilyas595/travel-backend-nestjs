import { Test, TestingModule } from '@nestjs/testing';
import { TopRestaurantsController } from './top-restaurants.controller';
import { TopRestaurantsService } from './top-restaurants.service';

describe('TopRestaurantsController', () => {
  let controller: TopRestaurantsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TopRestaurantsController],
      providers: [TopRestaurantsService],
    }).compile();

    controller = module.get<TopRestaurantsController>(TopRestaurantsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
