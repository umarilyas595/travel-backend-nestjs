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
import { GoogleService } from './google.service';
import { CreateGoogleDto } from './dto/create-google.dto';
import { UpdateGoogleDto } from './dto/update-google.dto';

@Controller('google')
export class GoogleController {
  constructor(private readonly googleService: GoogleService) {}

  @Post()
  create(@Body() createGoogleDto: CreateGoogleDto) {
    return this.googleService.create(createGoogleDto);
  }

  @Get('placedetails')
  place_details(
    @Query('name') place_id: string,
    @Query('fields') fields: string,
  ) {
    console.log('REQ : ', fields);
    return this.googleService.place_details(place_id, fields);
  }
  @Get('findplacefromtext')
  findplacefromtext(@Query('place') place: string) {
    return this.googleService.find_place_from_text(place);
  }
  @Get('textsearch')
  textsearch(@Query('place') place: string) {
    return this.googleService.text_search(place);
  }
  @Get('distancemeasure')
  distanceMeasure(
    @Query('origin') origin: string,
    @Query('destination') destination: string,
  ) {
    return this.googleService.distanceMeasure(origin, destination);
  }
  @Get('placephotos')
  placephotos(
    @Query('photo_ref') photo_ref: string,
    @Query('max_width') max_width: string,
  ) {
    return this.googleService.place_photos(photo_ref, max_width);
  }

  @Get('fetchWithPagination')
  fetchWithPagination(
    @Query('take') take: number,
    @Query('page') page: number,
  ) {
    return this.googleService.fetchWithPagination(take, page);
  }
  @Get()
  findAll() {
    return this.googleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.googleService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGoogleDto: UpdateGoogleDto) {
    return this.googleService.update(+id, updateGoogleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.googleService.remove(+id);
  }
}
