import { Test, TestingModule } from '@nestjs/testing';
import { PlaceDetailsController } from './place_details.controller';
import { PlaceDetailsService } from './place_details.service';

describe('PlaceDetailsController', () => {
  let controller: PlaceDetailsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlaceDetailsController],
      providers: [PlaceDetailsService],
    }).compile();

    controller = module.get<PlaceDetailsController>(PlaceDetailsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
