import { Module } from '@nestjs/common';
import { TopOccasionSearchService } from './top-occasion-search.service';
import { TopOccasionSearchController } from './top-occasion-search.controller';
import { OpenaiModule } from 'src/openai/openai.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TopOccasionSearch } from './entities/top-occasion-search.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TopOccasionSearch]), OpenaiModule],
  controllers: [TopOccasionSearchController],
  providers: [TopOccasionSearchService],
})
export class TopOccasionSearchModule {}
