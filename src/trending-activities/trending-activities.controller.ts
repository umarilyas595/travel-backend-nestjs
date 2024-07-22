import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TrendingActivitiesService } from './trending-activities.service';
import { CreateTrendingActivityDto } from './dto/create-trending-activity.dto';
import { UpdateTrendingActivityDto } from './dto/update-trending-activity.dto';

@Controller('trending-activities')
export class TrendingActivitiesController {
  constructor(
    private readonly trendingActivitiesService: TrendingActivitiesService,
  ) {}

  @Post()
  create(@Body() createTrendingActivityDto: CreateTrendingActivityDto) {
    return this.trendingActivitiesService.create(createTrendingActivityDto);
  }

  @Get()
  findAll() {
    return this.trendingActivitiesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.trendingActivitiesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTrendingActivityDto: UpdateTrendingActivityDto,
  ) {
    return this.trendingActivitiesService.update(
      +id,
      updateTrendingActivityDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.trendingActivitiesService.remove(+id);
  }
}
