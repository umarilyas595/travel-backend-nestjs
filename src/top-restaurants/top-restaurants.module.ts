import { Module } from '@nestjs/common';
import { TopRestaurantsService } from './top-restaurants.service';
import { TopRestaurantsController } from './top-restaurants.controller';
import { TopRestaurant } from './entities/top-restaurant.entity';
import { GoogleModule } from 'src/google/google.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([TopRestaurant]), GoogleModule],
  controllers: [TopRestaurantsController],
  providers: [TopRestaurantsService],
})
export class TopRestaurantsModule {}
