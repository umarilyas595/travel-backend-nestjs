import { Injectable } from '@nestjs/common';
import { CreateTrendingActivityDto } from './dto/create-trending-activity.dto';
import { UpdateTrendingActivityDto } from './dto/update-trending-activity.dto';
import { TrendingActivity } from './entities/trending-activity.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { TopRestaurant } from 'src/top-restaurants/entities/top-restaurant.entity';
import { Repository } from 'typeorm';
import { GoogleService } from 'src/google/google.service';
import { topCountries } from 'src/constants/coutrieslist';
import { Cron, CronExpression } from '@nestjs/schedule';
@Injectable()
export class TrendingActivitiesService {
  constructor(
    @InjectRepository(TrendingActivity)
    private trendingActivitiesRepository: Repository<TrendingActivity>,
    private readonly gooleService: GoogleService,
  ) {}
  create(createTrendingActivityDto: CreateTrendingActivityDto) {
    return 'This action adds a new trendingActivity';
  }

  async findAll() {
    return await this.trendingActivitiesRepository.find();
  }

  findOne(id: number) {
    return this.trendingActivitiesRepository.findOne({
      where: {
        id,
      },
    });
  }

  update(id: number, updateTrendingActivityDto: UpdateTrendingActivityDto) {
    return `This action updates a #${id} trendingActivity`;
  }

  remove(id: number) {
    return `This action removes a #${id} trendingActivity`;
  }

  @Cron(CronExpression.EVERY_1ST_DAY_OF_MONTH_AT_NOON)
  async handleCron() {
    const fetchedData = [];
    for (let i = 0; i < topCountries.length; ++i) {
      const locationService = await this.gooleService.text_search(
        `best activities for tourist in ${topCountries[i]} `,
      );
      if (locationService?.results) {
        const data = locationService?.results;
        const location = await this.gooleService.place_details(
          data[0]?.place_id,
        );
        const photos = [];
        if (location?.result?.photos?.length > 0) {
          // console.log('RESULT : ', location?.result.photos);
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
    await this.trendingActivitiesRepository.clear();
    const trendtingLocationDataSaved =
      await this.trendingActivitiesRepository.create([...fetchedData]);
    const dbResponse = await this.trendingActivitiesRepository.save(
      trendtingLocationDataSaved,
    );
  }
}
