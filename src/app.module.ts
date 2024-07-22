import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocationModule } from './location/location.module';
import { OpenaiModule } from './openai/openai.module';
import { GoogleModule } from './google/google.module';
import { ReviewsModule } from './reviews/reviews.module';
import { TrendingLocationsModule } from './trending-locations/trending-locations.module';
import { ScheduleModule } from '@nestjs/schedule';
import { TrendingActivitiesModule } from './trending-activities/trending-activities.module';
import { TopRestaurantsModule } from './top-restaurants/top-restaurants.module';
import { TopCountrySearchModule } from './top-country-search/top-country-search.module';
import { TopOccasionSearchModule } from './top-occasion-search/top-occasion-search.module';
import { TopPrioritySearchModule } from './top-priority-search/top-priority-search.module';
import { TopCapitalSearchModule } from './top-capital-search/top-capital-search.module';
import { WorldCoutriesCitiesModule } from './world-coutries-cities/world-coutries-cities.module';
import { RedisModule } from './redis/redis.module';
import { PlaceDetailsModule } from './place_details/place_details.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [__dirname + '/../modules/**/entities/*.entity.{js,ts}'],
      autoLoadEntities: true,
      synchronize: true,
    }),
    LocationModule,
    OpenaiModule,
    GoogleModule,
    ReviewsModule,
    RedisModule,
    TrendingLocationsModule,
    TrendingActivitiesModule,
    TopRestaurantsModule,
    TopCountrySearchModule,
    TopOccasionSearchModule,
    TopPrioritySearchModule,
    TopCapitalSearchModule,
    WorldCoutriesCitiesModule,
    PlaceDetailsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
