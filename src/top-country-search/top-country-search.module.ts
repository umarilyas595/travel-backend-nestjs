import { Module } from '@nestjs/common';
import { TopCountrySearchService } from './top-country-search.service';
import { TopCountrySearchController } from './top-country-search.controller';
import { TopCountrySearch } from './entities/top-country-search.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OpenaiModule } from 'src/openai/openai.module';

@Module({
  imports: [TypeOrmModule.forFeature([TopCountrySearch]), OpenaiModule],
  controllers: [TopCountrySearchController],
  providers: [TopCountrySearchService],
})
export class TopCountrySearchModule {}
