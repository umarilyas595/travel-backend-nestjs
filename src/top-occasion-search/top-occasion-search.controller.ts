import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TopOccasionSearchService } from './top-occasion-search.service';
import { CreateTopOccasionSearchDto } from './dto/create-top-occasion-search.dto';
import { UpdateTopOccasionSearchDto } from './dto/update-top-occasion-search.dto';

@Controller('top-occasion-search')
export class TopOccasionSearchController {
  constructor(
    private readonly topOccasionSearchService: TopOccasionSearchService,
  ) {}

  @Post()
  create(@Body() createTopOccasionSearchDto: CreateTopOccasionSearchDto) {
    return this.topOccasionSearchService.create(createTopOccasionSearchDto);
  }

  @Post('db-seeder')
  dbSeeder() {
    return this.topOccasionSearchService.dbSeeder();
  }
  @Post('increment/:id')
  incrementStateUpdate(@Param('id') id: string) {
    return this.topOccasionSearchService.incrementStateUpdate(+id);
  }
  @Get()
  findAll() {
    return this.topOccasionSearchService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.topOccasionSearchService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTopOccasionSearchDto: UpdateTopOccasionSearchDto,
  ) {
    return this.topOccasionSearchService.update(
      +id,
      updateTopOccasionSearchDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.topOccasionSearchService.remove(+id);
  }
}
