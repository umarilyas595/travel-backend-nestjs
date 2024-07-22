import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { LocationService } from './location.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';

@Controller('location')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Post()
  create(@Body() createLocationDto: CreateLocationDto) {
    return this.locationService.create(createLocationDto);
  }

  @Get()
  findAll() {
    return this.locationService.findAll();
  }
  @Get('/search/:location')
  locationSearch(@Param('location') location: string) {
    return this.locationService.locationSearch(location);
  }
  // @Get('/allsearch/:location')
  // allSearch(@Param('location') location: string) {
  //   return this.locationService.allSearch(location);
  // }
  @Get('/details/:id/:language')
  locationDetails(
    @Param('id') id: string,
    @Param('language') language: string,
  ) {
    return this.locationService.locationDetails(+id, language);
  }
  @Get('/reviews/:id/:language')
  locationReviews(
    @Param('id') id: string,
    @Param('language') language: string,
  ) {
    return this.locationService.locationReviews(+id, language);
  }

  @Get('/photos/:id')
  locationPhotos(@Param('id') id: string) {
    return this.locationService.locationPhotos(+id);
  }

  @Get('/nearby_search/:latitude/:longitude/:category')
  locationNearbySearch(
    @Param('latitude') latitude: string,
    @Param('longitude') longitude: string,
    @Param('category') category: string,
  ) {
    return this.locationService.locationNearBySearch(
      latitude,
      longitude,
      category,
    );
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.locationService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateLocationDto: UpdateLocationDto,
  ) {
    return this.locationService.update(+id, updateLocationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.locationService.remove(+id);
  }
}
