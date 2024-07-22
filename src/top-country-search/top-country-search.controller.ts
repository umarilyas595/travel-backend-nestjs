import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TopCountrySearchService } from './top-country-search.service';
import { CreateTopCountrySearchDto } from './dto/create-top-country-search.dto';
import { UpdateTopCountrySearchDto } from './dto/update-top-country-search.dto';

@Controller('top-country-search')
export class TopCountrySearchController {
  constructor(
    private readonly topCountrySearchService: TopCountrySearchService,
  ) {}

  @Post()
  create(@Body() createTopCountrySearchDto: CreateTopCountrySearchDto) {
    return this.topCountrySearchService.create(createTopCountrySearchDto);
  }

  @Post('db-seeder')
  dbSeeder() {
    return this.topCountrySearchService.dbSeeder();
  }
  @Post('increment/:id')
  incrementStateUpdate(@Param('id') id: string) {
    return this.topCountrySearchService.incrementStateUpdate(+id);
  }
  @Get()
  findAll() {
    return this.topCountrySearchService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.topCountrySearchService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTopCountrySearchDto: UpdateTopCountrySearchDto,
  ) {
    return this.topCountrySearchService.update(+id, updateTopCountrySearchDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.topCountrySearchService.remove(+id);
  }
}
