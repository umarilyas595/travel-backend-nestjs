import { Injectable } from '@nestjs/common';
import { CreateTopRestaurantDto } from './dto/create-top-restaurant.dto';
import { UpdateTopRestaurantDto } from './dto/update-top-restaurant.dto';
import { Cron, CronExpression } from '@nestjs/schedule';
import { topCountries } from 'src/constants/coutrieslist';
import { GoogleService } from 'src/google/google.service';
import { InjectRepository } from '@nestjs/typeorm';
import { TopRestaurant } from './entities/top-restaurant.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TopRestaurantsService {
  constructor(
    @InjectRepository(TopRestaurant)
    private topRetaurantsRepository: Repository<TopRestaurant>,
    private readonly gooleService: GoogleService,
  ) {}
  create(createTopRestaurantDto: CreateTopRestaurantDto) {
    return 'This action adds a new topRestaurant';
  }

  async findAll() {
    return await this.topRetaurantsRepository.find({});
  }

  findOne(id: number) {
    return this.topRetaurantsRepository.findOne({
      where: {
        id,
      },
    });
  }

  update(id: number, updateTopRestaurantDto: UpdateTopRestaurantDto) {
    return `This action updates a #${id} topRestaurant`;
  }

  remove(id: number) {
    return `This action removes a #${id} topRestaurant`;
  }

  @Cron(CronExpression.EVERY_2ND_MONTH)
  async handleCron() {
    const fetchedData = [];
    for (let i = 0; i < topCountries.length; ++i) {
      const locationService = await this.gooleService.text_search(
        `best restaurants for visit in ${topCountries[i]} for tourist`,
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
    await this.topRetaurantsRepository.clear();
    const trendtingLocationDataSaved =
      await this.topRetaurantsRepository.create([...fetchedData]);
    const dbResponse = await this.topRetaurantsRepository.save(
      trendtingLocationDataSaved,
    );
  }
}

// =best%20places%20for%20visit%20in%20world%20for%20tourist

// async handleCron() {
//   const fetchedData = [];
//   const locationService = await this.gooleService.text_search(
//     'best places for visit in world for tourist',
//   );
//   if (locationService?.results) {
//     const data = locationService?.results;
//     for (let i = 0; i < data.length; ++i) {
//       const location = await this.gooleService.place_details(
//         data[i].place_id,
//       );
//       console.log('cyeck ', location?.result?.photos);
//       // console.log('oye :', location?.result?.photos[0]?.photo_reference);
//       // console.log('oye :', data[i].photos[0].width);

//       const images = await this.gooleService.place_photos(
//         location?.result?.photos[0]?.photo_reference,
//         location?.result?.photos[0]?.width,
//       );
//       // console.log('Image : ', images);
//       // console.log('DETAILS : ', location.result);
//       // console.log('checl :', {
//       //   name: location?.result?.name,
//       //   place_id: data[i]?.place_id,
//       //   details: location?.result,
//       //   image: 'images?.url',
//       // });
//       // fetchedData.push({
//       //   name: location.result.name,
//       //   place_id: data[i].place_id,
//       //   details: location.result,
//       //   image: images.url,
//       // });
//       // ('IMAGEs', images.url);
//       // console.log('DATA : ', data[i].photos[0]);
//       //   await this.trendingLocationRepository.clear();
//       //   const trendtingLocationDataSaved =
//       //     await this.trendingLocationRepository.create([...fetchedData]);
//       //   const dbResponse = await this.trendingLocationRepository.save(
//       //     trendtingLocationDataSaved,
//       //   );
//     }
//   }

//   console.log('Location Service', fetchedData);
//   console.log('He');
//   return 'Jeo';
// }
