import { Test, TestingModule } from '@nestjs/testing';
import { PlaceDetailsService } from './place_details.service';

describe('PlaceDetailsService', () => {
  let service: PlaceDetailsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlaceDetailsService],
    }).compile();

    service = module.get<PlaceDetailsService>(PlaceDetailsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
