import { Module } from '@nestjs/common';
import { WorldCoutriesCitiesService } from './world-coutries-cities.service';
import { WorldCoutriesCitiesController } from './world-coutries-cities.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorldCoutriesCity } from './entities/world-coutries-city.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WorldCoutriesCity])],
  controllers: [WorldCoutriesCitiesController],
  providers: [WorldCoutriesCitiesService],
})
export class WorldCoutriesCitiesModule {}
