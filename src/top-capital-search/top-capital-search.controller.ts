import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TopCapitalSearchService } from './top-capital-search.service';
import { CreateTopCapitalSearchDto } from './dto/create-top-capital-search.dto';
import { UpdateTopCapitalSearchDto } from './dto/update-top-capital-search.dto';

@Controller('top-capital-search')
export class TopCapitalSearchController {
  constructor(
    private readonly topCapitalSearchService: TopCapitalSearchService,
  ) {}

  @Post()
  create(@Body() createTopCapitalSearchDto: CreateTopCapitalSearchDto) {
    return this.topCapitalSearchService.create(createTopCapitalSearchDto);
  }

  @Post('db-seeder')
  dbSeeder() {
    return this.topCapitalSearchService.dbSeeder();
  }
  @Post('increment/:id')
  incrementStateUpdate(@Param('id') id: string) {
    return this.topCapitalSearchService.incrementStateUpdate(+id);
  }
  @Get()
  findAll() {
    return this.topCapitalSearchService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.topCapitalSearchService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTopCapitalSearchDto: UpdateTopCapitalSearchDto,
  ) {
    return this.topCapitalSearchService.update(+id, updateTopCapitalSearchDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.topCapitalSearchService.remove(+id);
  }
}
