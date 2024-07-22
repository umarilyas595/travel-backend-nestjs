import { Test, TestingModule } from '@nestjs/testing';
import { TopCountrySearchService } from './top-country-search.service';

describe('TopCountrySearchService', () => {
  let service: TopCountrySearchService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TopCountrySearchService],
    }).compile();

    service = module.get<TopCountrySearchService>(TopCountrySearchService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
