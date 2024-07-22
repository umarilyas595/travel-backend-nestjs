import { Injectable } from '@nestjs/common';
import { CreateTrendingLocationDto } from './dto/create-trending-location.dto';
import { UpdateTrendingLocationDto } from './dto/update-trending-location.dto';
import { GoogleModule } from 'src/google/google.module';
import { GoogleService } from 'src/google/google.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cron, CronExpression } from '@nestjs/schedule';

import { TrendingLocation } from './entities/trending-location.entity';
import { topCountries } from 'src/constants/coutrieslist';

@Injectable()
export class TrendingLocationsService {
  constructor(
    @InjectRepository(TrendingLocation)
    private trendingLocationRepository: Repository<TrendingLocation>,
    private readonly gooleService: GoogleService,
  ) {}
  create(createTrendingLocationDto: CreateTrendingLocationDto) {
    return 'This action adds a new trendingLocation';
  }

  async findAll() {
    return await this.trendingLocationRepository.find({});
  }

  findOne(id: number) {
    return this.trendingLocationRepository.findOne({
      where: {
        id,
      },
    });
  }

  update(id: number, updateTrendingLocationDto: UpdateTrendingLocationDto) {
    return `This action updates a #${id} trendingLocation`;
  }

  remove(id: number) {
    return `This action removes a #${id} trendingLocation`;
  }

  @Cron(CronExpression.EVERY_1ST_DAY_OF_MONTH_AT_MIDNIGHT)
  async handleCron() {
    const fetchedData = [];
    for (let i = 0; i < topCountries.length; ++i) {
      const locationService = await this.gooleService.text_search(
        `best places for visit in ${topCountries[i]} for tourist`,
      );
      if (locationService?.results) {
        const data = locationService?.results;
        const location = await this.gooleService.place_details(
          data[0]?.place_id,
        );
        const photos = [];
        if (location?.result.photos.length > 0) {
          for (let i = 0; i < location?.result.photos.length; ++i) {
            if (
              location?.result?.photos[i]?.photo_reference &&
              location?.result?.photos[i]?.width
            ) {
              if (i == 5) {
                break;
              }
              const images = await this.gooleService.place_photos(
                location?.result?.photos[i]?.photo_reference,
                location?.result?.photos[i]?.width,
              );
              photos.push(images);
            }
          }
        }

        fetchedData.push({
          name: location.result.name,
          place_id: location?.result?.place_id,
          details: location.result,
          image: { image: photos },
        });
      }
    }
    await this.trendingLocationRepository.clear();
    const trendtingLocationDataSaved =
      await this.trendingLocationRepository.create([...fetchedData]);
    const dbResponse = await this.trendingLocationRepository.save(
      trendtingLocationDataSaved,
    );
  }
}
