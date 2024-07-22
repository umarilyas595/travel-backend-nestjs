import { Module } from '@nestjs/common';
import { TrendingActivitiesService } from './trending-activities.service';
import { TrendingActivitiesController } from './trending-activities.controller';
import { GoogleModule } from 'src/google/google.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrendingActivity } from './entities/trending-activity.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TrendingActivity]), GoogleModule],
  controllers: [TrendingActivitiesController],
  providers: [TrendingActivitiesService],
})
export class TrendingActivitiesModule {}
