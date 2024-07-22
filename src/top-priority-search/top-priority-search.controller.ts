import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TopPrioritySearchService } from './top-priority-search.service';
import { CreateTopPrioritySearchDto } from './dto/create-top-priority-search.dto';
import { UpdateTopPrioritySearchDto } from './dto/update-top-priority-search.dto';

@Controller('top-priority-search')
export class TopPrioritySearchController {
  constructor(
    private readonly topPrioritySearchService: TopPrioritySearchService,
  ) {}

  @Post()
  create(@Body() createTopPrioritySearchDto: CreateTopPrioritySearchDto) {
    return this.topPrioritySearchService.create(createTopPrioritySearchDto);
  }

  @Post('db-seeder')
  dbSeeder() {
    return this.topPrioritySearchService.dbSeeder();
  }
  @Post('increment/:id')
  incrementStateUpdate(@Param('id') id: string) {
    return this.topPrioritySearchService.incrementStateUpdate(+id);
  }
  @Get()
  findAll() {
    return this.topPrioritySearchService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.topPrioritySearchService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTopPrioritySearchDto: UpdateTopPrioritySearchDto,
  ) {
    return this.topPrioritySearchService.update(
      +id,
      updateTopPrioritySearchDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.topPrioritySearchService.remove(+id);
  }
}
