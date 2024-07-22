import { Test, TestingModule } from '@nestjs/testing';
import { TopPrioritySearchController } from './top-priority-search.controller';
import { TopPrioritySearchService } from './top-priority-search.service';

describe('TopPrioritySearchController', () => {
  let controller: TopPrioritySearchController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TopPrioritySearchController],
      providers: [TopPrioritySearchService],
    }).compile();

    controller = module.get<TopPrioritySearchController>(TopPrioritySearchController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
