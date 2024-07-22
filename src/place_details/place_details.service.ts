import { HttpException, Injectable } from '@nestjs/common';
import { CreatePlaceDetailDto } from './dto/create-place_detail.dto';
import { UpdatePlaceDetailDto } from './dto/update-place_detail.dto';
import axios from 'axios';
import { GoogleService } from '../google/google.service';
import { InjectRepository } from '@nestjs/typeorm';
import { PlaceDetail } from './entities/place_detail.entity';
import { Repository } from 'typeorm';
@Injectable()
export class PlaceDetailsService {
  constructor(
    private readonly googleService: GoogleService,
    @InjectRepository(PlaceDetail)
    private placeDetailsRepository: Repository<PlaceDetail>,
  ) {}
  create(createPlaceDetailDto: CreatePlaceDetailDto) {
    return 'This action adds a new placeDetail';
  }

  async text_search(place: string) {
    try {
      const options = {
        method: 'get',
        url: `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${place}&key=${process.env.GOOGLEMAP_API_KEY}`,
        headers: {},
      };

      const response = await axios.request(options);
      for (let i = 0; i < response.data.results.length; ++i) {
        const details = await this.googleService.place_details(
          response.data.results[i].place_id,
        );
        if (
          (await this.placeDetailsRepository.count({
            where: { place_id: response.data.results[i].place_id },
          })) === 0
        ) {
          await this.placeDetailsRepository.save({
            place_id: response.data.results[i].place_id,
            details,
          });
        }
      }
      return response.data;
    } catch (error) {
      throw new HttpException(error.response.statusText, error.response.status);
    }
  }

  findAll() {
    return `This action returns all placeDetails`;
  }

  findOne(id: number) {
    return `This action returns a #${id} placeDetail`;
  }

  update(id: number, updatePlaceDetailDto: UpdatePlaceDetailDto) {
    return `This action updates a #${id} placeDetail`;
  }

  remove(id: number) {
    return `This action removes a #${id} placeDetail`;
  }
}
