import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTopOccasionSearchDto } from './dto/create-top-occasion-search.dto';
import { UpdateTopOccasionSearchDto } from './dto/update-top-occasion-search.dto';
import { TopOccasionSearch } from './entities/top-occasion-search.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { OpenaiService } from 'src/openai/openai.service';
import { Repository } from 'typeorm';

@Injectable()
export class TopOccasionSearchService {
  constructor(
    @InjectRepository(TopOccasionSearch)
    private topOccasionRepository: Repository<TopOccasionSearch>,
    private readonly openAI: OpenaiService,
  ) {}
  async incrementStateUpdate(id: number) {
    try {
      const find = await this.topOccasionRepository.findOne({
        where: {
          id,
        },
      });
      if (!find) {
        throw new NotFoundException('not found any record against this id');
      }
      const update = await this.topOccasionRepository.update(find.id, {
        totalSearchTime: ++find.totalSearchTime,
      });
      return find;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async dbSeeder() {
    try {
      const occasion = [
        {
          name: 'Birthday',
        },
        {
          name: 'Bachelor Party',
        },
        {
          name: 'Bachelorette party',
        },
        {
          name: 'Wedding',
        },
        {
          name: 'Engagement',
        },
        {
          name: 'Traveling for fun',
        },
        {
          name: 'Family vacation',
        },
        {
          name: 'Just looking to party',
        },
        {
          name: 'Reunion',
        },
        {
          name: 'Honeymoon',
        },
        {
          name: 'Anniversary',
        },
      ];
      const data = this.topOccasionRepository.create([...occasion]);
      const savedIntoDb = await this.topOccasionRepository.save(data);
      return savedIntoDb;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
  async create(createTopOccasionSearchDto: CreateTopOccasionSearchDto) {
    try {
      const valididityCheckFromOpenAI = await this.openAI.create({
        content: `Please confirm  occasion  name    and name is ${createTopOccasionSearchDto.name}.  is it valid or not and response should be like {
            "occasion" :"put name here",
            "isValid": boolean response
          } and remove extra spaces and response should be same either it's valid or not`,
      });

      const responseFromOpenAI = JSON.parse(
        valididityCheckFromOpenAI[0].message.content,
      );

      if (responseFromOpenAI?.isValid && responseFromOpenAI?.occasion) {
        const isExist = await this.topOccasionRepository.findOne({
          where: {
            name:
              responseFromOpenAI?.occasion.charAt(0).toUpperCase() +
              responseFromOpenAI?.occasion.slice(1),
          },
        });
        if (isExist) {
          const incrementStateUpdate = this.incrementStateUpdate(isExist.id);
          return incrementStateUpdate;
        }
        const data = await this.topOccasionRepository.create({
          name:
            responseFromOpenAI?.occasion.charAt(0).toUpperCase() +
            responseFromOpenAI?.occasion.slice(1),
          totalSearchTime: 1,
        });
        const savedIntoDb = await this.topOccasionRepository.save(data);
        return savedIntoDb;
      } else {
        throw new HttpException('Not valid', 422);
      }
    } catch (error) {
      throw new HttpException('Not valid', 422);
    }
  }

  findAll() {
    return this.topOccasionRepository.find({
      order: {
        totalSearchTime: 'DESC',
      },
    });
  }
  findOne(id: number) {
    return this.topOccasionRepository.findOne({
      where: {
        id,
      },
    });
  }

  async update(
    id: number,
    updateTopOccasionSearchDto: UpdateTopOccasionSearchDto,
  ) {
    try {
      const previousData = await this.findOne(id);
      if (!previousData) {
        throw new NotFoundException('Not found');
      }
      return await this.topOccasionRepository.save({
        ...previousData,
        ...updateTopOccasionSearchDto,
      });
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async remove(id: number) {
    try {
      const isDelete = await this.topOccasionRepository.delete(id);
      if (isDelete?.affected <= 0) {
        throw new NotFoundException('Not Found any data against this id.');
      }

      return 'Successfully Deleted';
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
