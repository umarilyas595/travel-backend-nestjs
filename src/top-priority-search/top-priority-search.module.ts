import { Module } from '@nestjs/common';
import { TopPrioritySearchService } from './top-priority-search.service';
import { TopPrioritySearchController } from './top-priority-search.controller';
import { OpenaiModule } from 'src/openai/openai.module';
import { TopPrioritySearch } from './entities/top-priority-search.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([TopPrioritySearch]), OpenaiModule],
  controllers: [TopPrioritySearchController],
  providers: [TopPrioritySearchService],
})
export class TopPrioritySearchModule {}
