import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateDto } from './dto/create.dto';
import { RedisService } from './redis.service';

@Controller('caching')
export class RedisController {
  constructor(private readonly redisService: RedisService) {}

  @Post()
  create(@Body() createDto: CreateDto) {
    return this.redisService.set(createDto);
  }

  // @Get()
  // findAll() {
  //   return this.topRestaurantsService.findAll();
  // }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.redisService.get(id);
  }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateTopRestaurantDto: UpdateTopRestaurantDto,
  // ) {
  //   return this.topRestaurantsService.update(+id, updateTopRestaurantDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.topRestaurantsService.remove(+id);
  // }
}
