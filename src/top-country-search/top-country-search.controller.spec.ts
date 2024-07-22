import { Test, TestingModule } from '@nestjs/testing';
import { TopCountrySearchController } from './top-country-search.controller';
import { TopCountrySearchService } from './top-country-search.service';

describe('TopCountrySearchController', () => {
  let controller: TopCountrySearchController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TopCountrySearchController],
      providers: [TopCountrySearchService],
    }).compile();

    controller = module.get<TopCountrySearchController>(TopCountrySearchController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
