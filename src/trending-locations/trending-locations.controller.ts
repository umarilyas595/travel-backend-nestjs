import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TrendingLocationsService } from './trending-locations.service';
import { CreateTrendingLocationDto } from './dto/create-trending-location.dto';
import { UpdateTrendingLocationDto } from './dto/update-trending-location.dto';

@Controller('trending-locations')
export class TrendingLocationsController {
  constructor(
    private readonly trendingLocationsService: TrendingLocationsService,
  ) {}

  @Post()
  create(@Body() createTrendingLocationDto: CreateTrendingLocationDto) {
    return this.trendingLocationsService.create(createTrendingLocationDto);
  }

  @Get()
  findAll() {
    return this.trendingLocationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.trendingLocationsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTrendingLocationDto: UpdateTrendingLocationDto,
  ) {
    return this.trendingLocationsService.update(+id, updateTrendingLocationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.trendingLocationsService.remove(+id);
  }
}
