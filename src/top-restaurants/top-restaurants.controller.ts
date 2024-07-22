import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TopRestaurantsService } from './top-restaurants.service';
import { CreateTopRestaurantDto } from './dto/create-top-restaurant.dto';
import { UpdateTopRestaurantDto } from './dto/update-top-restaurant.dto';

@Controller('top-restaurants')
export class TopRestaurantsController {
  constructor(private readonly topRestaurantsService: TopRestaurantsService) {}

  @Post()
  create(@Body() createTopRestaurantDto: CreateTopRestaurantDto) {
    return this.topRestaurantsService.create(createTopRestaurantDto);
  }

  @Get()
  findAll() {
    return this.topRestaurantsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.topRestaurantsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTopRestaurantDto: UpdateTopRestaurantDto,
  ) {
    return this.topRestaurantsService.update(+id, updateTopRestaurantDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.topRestaurantsService.remove(+id);
  }
}
