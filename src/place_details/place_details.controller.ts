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
import { PlaceDetailsService } from './place_details.service';
import { CreatePlaceDetailDto } from './dto/create-place_detail.dto';
import { UpdatePlaceDetailDto } from './dto/update-place_detail.dto';

@Controller('place-details')
export class PlaceDetailsController {
  constructor(private readonly placeDetailsService: PlaceDetailsService) {}

  @Post()
  create(@Body() createPlaceDetailDto: CreatePlaceDetailDto) {
    return this.placeDetailsService.create(createPlaceDetailDto);
  }

  @Get('textsearch')
  textsearch(@Query('place') place: string) {
    return this.placeDetailsService.text_search(place);
  }

  @Get()
  findAll() {
    return this.placeDetailsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.placeDetailsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePlaceDetailDto: UpdatePlaceDetailDto,
  ) {
    return this.placeDetailsService.update(+id, updatePlaceDetailDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.placeDetailsService.remove(+id);
  }
}
