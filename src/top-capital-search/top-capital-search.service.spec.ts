import { Test, TestingModule } from '@nestjs/testing';
import { TopCapitalSearchService } from './top-capital-search.service';

describe('TopCapitalSearchService', () => {
  let service: TopCapitalSearchService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TopCapitalSearchService],
    }).compile();

    service = module.get<TopCapitalSearchService>(TopCapitalSearchService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
