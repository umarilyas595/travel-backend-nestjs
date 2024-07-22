import { HttpException, Injectable } from '@nestjs/common';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import axios from 'axios';
import { Location } from './entities/location.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
const { Configuration, OpenAIApi } = require('openai');

@Injectable()
export class LocationService {
  constructor(
    @InjectRepository(Location)
    private locationRepository: Repository<Location>,
  ) {}
  async allSearch(location: string) {
    const data = await this.locationSearch(location);
    return data;
    // throw new Error('Method not implemented.');
  }
  async locationSearch(location: string) {
    try {
      const options = {
        method: 'GET',
        url: 'https://api.content.tripadvisor.com/api/v1/location/search',
        headers: { accept: 'application/json' },
        params: {
          searchQuery: location,
          key: process.env.TRIP_ADVISOR_API_KEY,
        },
      };

      const response = await axios.request(options);

      for (let i = 0; i < response.data.data.length; ++i) {
        const check = await this.locationRepository.findOne({
          where: { location_id: response.data.data[i].location_id },
        });
        if (check) {
          continue;
        }
        try {
          const data = await this.locationDetails(
            response.data.data[i].location_id,
            'en',
          );
          const location = await this.locationRepository.create({
            name: response.data.data[i].name,
            location_id: response.data.data[i].location_id,
            street: data.address_obj.address_string,
            postalcode: data.address_obj.postalcode,
            city: data.address_obj.city,
            country: data.address_obj.country,
            rating: data.rating,
          });
          await this.locationRepository.save(location);
        } catch (e) {}
        // this.locationDetails(response.data.data[i].location_id, 'en')
        //   .then((data) => {
        //     const location = this.locationRepository.create({
        //       name: response.data.data[i].name,
        //       location_id: response.data.data[i].location_id,
        //       street: data.address_obj.address_string,
        //       postalcode: data.address_obj.postalcode,
        //       city: data.address_obj.city,
        //       country: data.address_obj.country,
        //       rating: data.rating,
        //     });
        //     this.locationRepository.save(location);
        //     console.log('location : ', location);
        //   })
        //   .catch((e) => {
        //     console.log('e', {
        //       name: response.data.data[i].name,
        //     });
        //   });
      }
      return await response.data;
    } catch (error) {
      throw new HttpException(error.response.statusText, error.response.status);
    }
  }

  async locationNearBySearch(
    latitude: string,
    longitude: string,
    category: string,
  ) {
    try {
      const options = {
        method: 'GET',

        url: 'https://api.content.tripadvisor.com/api/v1/location/nearby_search',
        headers: { accept: 'application/json' },
        params: {
          latLong: `${latitude}%2C${longitude}`,
          key: process.env.TRIP_ADVISOR_API_KEY,
          category,
        },
      };

      const response = await axios.request(options);
      return response.data;
    } catch (error) {
      throw new HttpException(error.response.statusText, error.response.status);
    }
  }
  async locationDetails(id: number, language: string) {
    try {
      const options = {
        method: 'GET',
        url: `https://api.content.tripadvisor.com/api/v1/location/${id}/details`,
        headers: { accept: 'application/json' },
        params: {
          language: language,
          key: process.env.TRIP_ADVISOR_API_KEY,
        },
      };

      const response = await axios.request(options);
      return response.data;
    } catch (error) {
      throw new HttpException(error.response.statusText, error.response.status);
    }
  }
  async locationReviews(id: number, language: string) {
    try {
      const options = {
        method: 'GET',
        url: `https://api.content.tripadvisor.com/api/v1/location/${id}/reviews`,
        headers: { accept: 'application/json' },
        params: {
          language: language,
          key: process.env.TRIP_ADVISOR_API_KEY,
        },
      };

      const response = await axios.request(options);
      return response.data;
    } catch (error) {
      throw new HttpException(error.response.statusText, error.response.status);
    }
  }

  async locationPhotos(id: number) {
    try {
      const options = {
        method: 'GET',
        url: `https://api.content.tripadvisor.com/api/v1/location/${id}/photos
        `,
        headers: { accept: 'application/json' },
        params: {
          key: process.env.TRIP_ADVISOR_API_KEY,
        },
      };

      const response = await axios.request(options);
      return response.data;
    } catch (error) {
      throw new HttpException(error.response.statusText, error.response.status);
    }
  }
  async create(createLocationDto: CreateLocationDto) {}

  async findAll() {
    return this.locationRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} location`;
  }

  update(id: number, updateLocationDto: UpdateLocationDto) {
    return `This action updates a #${id} location`;
  }

  remove(id: number) {
    return `This action removes a #${id} location`;
  }
}
