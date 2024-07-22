import { Test, TestingModule } from '@nestjs/testing';
import { TopPrioritySearchService } from './top-priority-search.service';

describe('TopPrioritySearchService', () => {
  let service: TopPrioritySearchService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TopPrioritySearchService],
    }).compile();

    service = module.get<TopPrioritySearchService>(TopPrioritySearchService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
