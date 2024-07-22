import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { WorldCoutriesCitiesService } from './world-coutries-cities.service';
import { CreateWorldCoutriesCityDto } from './dto/create-world-coutries-city.dto';
import { UpdateWorldCoutriesCityDto } from './dto/update-world-coutries-city.dto';

@Controller('world-countries-cities')
export class WorldCoutriesCitiesController {
  constructor(
    private readonly worldCoutriesCitiesService: WorldCoutriesCitiesService,
  ) {}

  @Get('db-seeder')
  dbSeeder() {
    return this.worldCoutriesCitiesService.initializeDatabase();
  }

  @Post()
  create(@Body() createWorldCoutriesCityDto: CreateWorldCoutriesCityDto) {
    return this.worldCoutriesCitiesService.create(createWorldCoutriesCityDto);
  }

  @Get('findByText')
  searchWorldCountriesCity(@Query('text') text: string) {
    return this.worldCoutriesCitiesService.searchWorldCountriesCity(text);
  }

  @Get()
  findAll(@Query('page') page: string, @Query('pageSize') pageSize: string) {
    return this.worldCoutriesCitiesService.fetchWorldCountriesCityWithPagination(
      +page,
      +pageSize,
    );
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.worldCoutriesCitiesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateWorldCoutriesCityDto: UpdateWorldCoutriesCityDto,
  ) {
    return this.worldCoutriesCitiesService.update(
      +id,
      updateWorldCoutriesCityDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.worldCoutriesCitiesService.remove(+id);
  }
}
