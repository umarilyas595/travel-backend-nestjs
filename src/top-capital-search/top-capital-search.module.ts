import { Module } from '@nestjs/common';
import { TopCapitalSearchService } from './top-capital-search.service';
import { TopCapitalSearchController } from './top-capital-search.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TopCapitalSearch } from './entities/top-capital-search.entity';
import { OpenaiModule } from 'src/openai/openai.module';

@Module({
  imports: [TypeOrmModule.forFeature([TopCapitalSearch]), OpenaiModule],
  controllers: [TopCapitalSearchController],
  providers: [TopCapitalSearchService],
})
export class TopCapitalSearchModule {}
