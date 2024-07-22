import { Test, TestingModule } from '@nestjs/testing';
import { WorldCoutriesCitiesService } from './world-coutries-cities.service';

describe('WorldCoutriesCitiesService', () => {
  let service: WorldCoutriesCitiesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WorldCoutriesCitiesService],
    }).compile();

    service = module.get<WorldCoutriesCitiesService>(WorldCoutriesCitiesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
