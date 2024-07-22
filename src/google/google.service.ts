import {
  HttpException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateGoogleDto } from './dto/create-google.dto';
import { UpdateGoogleDto } from './dto/update-google.dto';
import axios from 'axios';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Google } from './entities/google.entity';
import * as fs from 'fs';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class GoogleService {
  async fetchWithPagination(take = 10, page = 1) {
    try {
      const skip = (page - 1) * take;

      return await this.googleRepository.find({
        skip,
        take,
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
  constructor(
    @InjectRepository(Google)
    private googleRepository: Repository<Google>,
  ) {}
  async distanceMeasure(origin: string, destination: string) {
    try {
      const options = {
        method: 'get',
        url: `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin}&destinations=${destination}&units=imperial&key=${process.env.GOOGLEMAP_API_KEY}`,
        headers: {},
      };

      const response = await axios.request(options);
      return response.data;
    } catch (error) {
      throw new HttpException(error.response.statusText, error.response.status);
    }
  }

  async place_details(place_id: string, fields = '') {
    try {
      const options = {
        method: 'get',
        url: `https://maps.googleapis.com/maps/api/place/details/json?fields=${fields}&place_id=${place_id}&key=${process.env.GOOGLEMAP_API_KEY}`,
        headers: {},
      };

      const response = await axios.request(options);
      return response.data;
    } catch (error) {
      throw new HttpException(error.response.statusText, error.response.status);
    }
  }
  async place_photos(photo_ref: string, max_width) {
    try {
      const options = {
        method: 'get',
        url: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=${max_width}&photo_reference=${photo_ref}&key=${process.env.GOOGLEMAP_API_KEY}`,
        headers: {},
      };

      const response = await axios.request(options);
      return { url: response.request.res.responseUrl };
    } catch (error) {
      throw new HttpException(error.response.statusText, error.response.status);
    }
  }
  async find_place_from_text(place: string) {
    try {
      const options = {
        method: 'get',
        url: `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${place}&inputtype=textquery&fields=formatted_address%2Cname%2Crating%2Copening_hours%2Cgeometry%2Cphotos&key=${process.env.GOOGLEMAP_API_KEY}`,
        headers: {},
      };

      const response = await axios.request(options);
      return response.data;
    } catch (error) {
      throw new HttpException(error.response.statusText, error.response.status);
    }
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
        if (
          (await this.googleRepository.count({
            where: { place_id: response.data.results[i].place_id },
          })) === 0
        ) {
          await this.googleRepository.save({
            street: response.data.results[i].formatted_address,
            name: response.data.results[i].name,
            place_id: response.data.results[i].place_id,
            rating: response.data.results[i].rating,
            price_level: response.data.results[i].price_level,
            types: response.data.results[i].types,
            user_ratings_total: response.data.results[i].user_ratings_total,
          });
        }
      }
      return response.data;
    } catch (error) {
      throw new HttpException(error.response.statusText, error.response.status);
    }
  }
  create(createGoogleDto: CreateGoogleDto) {
    return 'This action adds a new google';
  }

  async findAll() {
    return await this.googleRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} google`;
  }

  update(id: number, updateGoogleDto: UpdateGoogleDto) {
    return `This action updates a #${id} google`;
  }

  remove(id: number) {
    return `This action removes a #${id} google`;
  }
}
