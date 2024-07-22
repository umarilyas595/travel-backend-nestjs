import { Test, TestingModule } from '@nestjs/testing';
import { TopCapitalSearchController } from './top-capital-search.controller';
import { TopCapitalSearchService } from './top-capital-search.service';

describe('TopCapitalSearchController', () => {
  let controller: TopCapitalSearchController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TopCapitalSearchController],
      providers: [TopCapitalSearchService],
    }).compile();

    controller = module.get<TopCapitalSearchController>(TopCapitalSearchController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
