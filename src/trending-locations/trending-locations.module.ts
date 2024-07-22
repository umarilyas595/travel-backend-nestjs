import { Module } from '@nestjs/common';
import { TrendingLocationsService } from './trending-locations.service';
import { TrendingLocationsController } from './trending-locations.controller';
import { TrendingLocation } from './entities/trending-location.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocationModule } from 'src/location/location.module';
import { GoogleModule } from 'src/google/google.module';

@Module({
  imports: [TypeOrmModule.forFeature([TrendingLocation]), GoogleModule],
  controllers: [TrendingLocationsController],
  providers: [TrendingLocationsService],
})
export class TrendingLocationsModule {}
