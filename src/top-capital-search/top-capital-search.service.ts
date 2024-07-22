import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTopCapitalSearchDto } from './dto/create-top-capital-search.dto';
import { UpdateTopCapitalSearchDto } from './dto/update-top-capital-search.dto';
import { TopCapitalSearch } from './entities/top-capital-search.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { OpenaiService } from 'src/openai/openai.service';
import { Repository } from 'typeorm';
@Injectable()
export class TopCapitalSearchService {
  constructor(
    @InjectRepository(TopCapitalSearch)
    private topCapitalRepository: Repository<TopCapitalSearch>,
    private readonly openAI: OpenaiService,
  ) {}
  async incrementStateUpdate(id: number) {
    try {
      const find = await this.topCapitalRepository.findOne({
        where: {
          id,
        },
      });
      if (!find) {
        throw new NotFoundException('not found any record against this id');
      }
      const update = await this.topCapitalRepository.update(find.id, {
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
        { name: 'Paris' },
        { name: 'New York City' },
        { name: 'London' },
        { name: 'Bangkok' },
        { name: 'Hong Kong' },
        { name: 'Dubai' },
        { name: 'Singapore' },
        { name: 'Rome' },
        { name: 'Istanbul' },
        { name: 'Kuala Lumpur' },
        { name: 'Delhi' },
        { name: 'Tokyo' },
        { name: 'Mexico City' },
        { name: 'Porto' },
        { name: 'Madrid' },
        { name: 'Sydney' },
        { name: 'Amsterdam' },
        { name: 'Cape Town' },
        { name: 'Dubrovnik' },
        { name: 'Vancouver' },
        { name: 'Machu Picchu' },
        { name: 'Budapest' },
        { name: 'Las Vegas' },
        { name: 'Geneva' },
        { name: 'Zurich' },
        { name: 'Nashville' },
        { name: 'Cappadocia' },
        { name: 'Venice' },
        { name: 'Florence' },
        { name: 'Bahamas' },
        { name: 'New Orleans' },
        { name: 'Seattle' },
        { name: 'District of Columbia' },
        { name: 'Kraków' },
        { name: 'Honolulu' },
        { name: 'Helsinki' },
        { name: 'Shanghai' },
        { name: 'Toronto' },
        { name: 'Casablanca' },
        { name: 'Lima' },
        { name: 'Buenos Aires' },
        { name: 'Osaka' },
        { name: 'Mumbai' },
        { name: 'Dublin' },
        { name: 'Bruges' },
        { name: 'Stockholm' },
        { name: 'Nice' },
        { name: 'Pattaya' },
        { name: 'Reykjavik' },
        { name: 'Washington DC' },
        { name: 'Oslo' },
        { name: 'Mykonos' },
        { name: 'São Paulo' },
        { name: 'Auckland' },
        { name: 'Seychelles' },
        { name: 'Kingston' },
        { name: 'Savannah' },
        { name: 'Brussels' },
        { name: 'Gardiner' },
        { name: 'Tahiti' },
        { name: 'St. Lucia' },
        { name: 'Petra' },
      ];

      const data = this.topCapitalRepository.create([...countries]);
      const savedIntoDb = await this.topCapitalRepository.save(data);
      return savedIntoDb;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
  async create(createTopCapitalSearchDto: CreateTopCapitalSearchDto) {
    try {
      const valididityCheckFromOpenAI = await this.openAI.create({
        content: `Please confirm  city  name and complete name if it's not complete  and name is ${createTopCapitalSearchDto.name}.  is it valid or not and response should be like {
            "city" :"put name here",
            "isValid": boolean response
          } and remove extra spaces and response should be same either it's valid or not`,
      });

      const responseFromOpenAI = JSON.parse(
        valididityCheckFromOpenAI[0].message.content,
      );

      if (responseFromOpenAI?.isValid && responseFromOpenAI?.city) {
        const isExist = await this.topCapitalRepository.findOne({
          where: {
            name:
              responseFromOpenAI?.city.charAt(0).toUpperCase() +
              responseFromOpenAI?.city.slice(1),
          },
        });
        if (isExist) {
          const incrementStateUpdate = this.incrementStateUpdate(isExist.id);
          return incrementStateUpdate;
        }
        const data = await this.topCapitalRepository.create({
          name:
            responseFromOpenAI?.city.charAt(0).toUpperCase() +
            responseFromOpenAI?.city.slice(1),
          totalSearchTime: 1,
        });
        const savedIntoDb = await this.topCapitalRepository.save(data);
        return savedIntoDb;
      } else {
        throw new HttpException('Not valid', 422);
      }
    } catch (error) {
      throw new HttpException('Not valid', 422);
    }
  }

  findAll() {
    return this.topCapitalRepository.find({
      order: {
        totalSearchTime: 'DESC',
      },
    });
  }
  findOne(id: number) {
    return this.topCapitalRepository.findOne({
      where: {
        id,
      },
    });
  }

  async update(
    id: number,
    updateTopCapitalSearchDto: UpdateTopCapitalSearchDto,
  ) {
    try {
      const previousData = await this.findOne(id);
      if (!previousData) {
        throw new NotFoundException('Not found');
      }
      return await this.topCapitalRepository.save({
        ...previousData,
        ...updateTopCapitalSearchDto,
      });
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async remove(id: number) {
    try {
      const isDelete = await this.topCapitalRepository.delete(id);
      await this.topCapitalRepository.clear();
      if (isDelete?.affected <= 0) {
        throw new NotFoundException('Not Found any data against this id.');
      }

      return 'Successfully Deleted';
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
