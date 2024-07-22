import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { OpenaiService } from 'src/openai/openai.service';
import { TopCountrySearch } from './entities/top-country-search.entity';
import { CreateTopCountrySearchDto } from './dto/create-top-country-search.dto';
import { UpdateTopCountrySearchDto } from './dto/update-top-country-search.dto';
@Injectable()
export class TopCountrySearchService {
  constructor(
    @InjectRepository(TopCountrySearch)
    private topLocationRepository: Repository<TopCountrySearch>,
    private readonly openAI: OpenaiService,
  ) {}
  async incrementStateUpdate(id: number) {
    try {
      const find = await this.topLocationRepository.findOne({
        where: {
          id,
        },
      });
      if (!find) {
        throw new NotFoundException('not found any record against this id');
      }
      const update = await this.topLocationRepository.update(find.id, {
        totalSearchTime: ++find.totalSearchTime,
      });
      return find;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async dbSeeder() {
    try {
      const countries = [
        { name: 'France' },
        { name: 'USA' },
        { name: 'England' },
        { name: 'Thailand' },
        { name: 'China' },
        { name: 'United Arab Emirates' },
        { name: 'Singapore' },
        { name: 'Italy' },
        { name: 'Turkey' },
        { name: 'Malaysia' },
        { name: 'India' },
        { name: 'Japan' },
        { name: 'Mexico' },
        { name: 'Portugal' },
        { name: 'Spain' },
        { name: 'Australia' },
        { name: 'Netherlands' },
        { name: 'South Africa' },
        { name: 'Croatia' },
        { name: 'Canada' },
        { name: 'Indonesia' },
        { name: 'Brazil' },
        { name: 'Greece' },
        { name: 'Egypt' },
        { name: 'Denmark' },
        { name: 'South Korea' },
        { name: 'Colombia' },
        { name: 'Peru' },
        { name: 'Hungary' },
        { name: 'Switzerland' },
        { name: 'Sweden' },
        { name: 'Iceland' },
        { name: 'Finland' },
        { name: 'New Zealand' },
        { name: 'Jamaica' },
        { name: 'Norway' },
        { name: 'Jordan' },
      ];
      const data = this.topLocationRepository.create([...countries]);
      const savedIntoDb = await this.topLocationRepository.save(data);
      return savedIntoDb;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
  async create(createTopCountrySearchDto: CreateTopCountrySearchDto) {
    try {
      const valididityCheckFromOpenAI = await this.openAI.create({
        content: `Please confirm  country  name and complete name if it's not complete  and name is ${createTopCountrySearchDto.name}.  is it valid or not and response should be like {
            "country" :"put name here",
            "isValid": boolean response
          } and remove extra spaces and response should be same either it's valid or not`,
      });

      const responseFromOpenAI = JSON.parse(
        valididityCheckFromOpenAI[0].message.content,
      );

      if (responseFromOpenAI?.isValid && responseFromOpenAI?.country) {
        const isExist = await this.topLocationRepository.findOne({
          where: {
            name:
              responseFromOpenAI?.country.charAt(0).toUpperCase() +
              responseFromOpenAI?.country.slice(1),
          },
        });
        if (isExist) {
          const incrementStateUpdate = this.incrementStateUpdate(isExist.id);
          return incrementStateUpdate;
        }
        const data = await this.topLocationRepository.create({
          name:
            responseFromOpenAI?.country.charAt(0).toUpperCase() +
            responseFromOpenAI?.country.slice(1),
          totalSearchTime: 1,
        });
        const savedIntoDb = await this.topLocationRepository.save(data);
        return savedIntoDb;
      } else {
        throw new HttpException('Not valid', 422);
      }
    } catch (error) {
      throw new HttpException('Not valid', 422);
    }
  }

  findAll() {
    return this.topLocationRepository.find({
      order: {
        totalSearchTime: 'DESC',
      },
    });
  }
  findOne(id: number) {
    return this.topLocationRepository.findOne({
      where: {
        id,
      },
    });
  }

  async update(
    id: number,
    updateTopCountrySearchDto: UpdateTopCountrySearchDto,
  ) {
    try {
      const previousData = await this.findOne(id);
      if (!previousData) {
        throw new NotFoundException('Not found');
      }
      return await this.topLocationRepository.save({
        ...previousData,
        ...updateTopCountrySearchDto,
      });
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async remove(id: number) {
    try {
      const isDelete = await this.topLocationRepository.delete(id);
      if (isDelete?.affected <= 0) {
        throw new NotFoundException('Not Found any data against this id.');
      }

      return 'Successfully Deleted';
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
