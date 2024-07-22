import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTopPrioritySearchDto } from './dto/create-top-priority-search.dto';
import { UpdateTopPrioritySearchDto } from './dto/update-top-priority-search.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TopPrioritySearch } from './entities/top-priority-search.entity';
import { Repository } from 'typeorm';
import { OpenaiService } from 'src/openai/openai.service';
@Injectable()
export class TopPrioritySearchService {
  constructor(
    @InjectRepository(TopPrioritySearch)
    private topPriorityRepository: Repository<TopPrioritySearch>,
    private readonly openAI: OpenaiService,
  ) {}
  async incrementStateUpdate(id: number) {
    try {
      const find = await this.topPriorityRepository.findOne({
        where: {
          id,
        },
      });
      if (!find) {
        throw new NotFoundException('not found any record against this id');
      }
      const update = await this.topPriorityRepository.update(find.id, {
        totalSearchTime: ++find.totalSearchTime,
      });
      return find;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async dbSeeder() {
    try {
      const priority = [
        {
          name: 'Beaches',
        },
        {
          name: 'Mountains',
        },
        {
          name: 'Clubs',
        },
        {
          name: 'Restaurants',
        },
        {
          name: 'Romance',
        },
        {
          name: 'Aquatic Activities',
        },
        {
          name: 'Outdoor Activities',
        },
        {
          name: 'Music Festivals',
        },
        {
          name: 'Camping',
        },
      ];
      const data = this.topPriorityRepository.create([...priority]);
      const savedIntoDb = await this.topPriorityRepository.save(data);
      return savedIntoDb;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
  async create(createTopPrioritySearchDto: CreateTopPrioritySearchDto) {
    try {
      const valididityCheckFromOpenAI = await this.openAI.create({
        content: `Please confirm  my priority  name  for my next tip like it should be my priority destination or activity or not and name is "${createTopPrioritySearchDto.name}".  is it valid or not and response should be like {
            "occasion" :"put name here",
            "isValid": boolean response
          } and remove extra spaces and response should be same either it's valid or not`,
      });

      const responseFromOpenAI = JSON.parse(
        valididityCheckFromOpenAI[0].message.content,
      );

      if (responseFromOpenAI?.isValid && responseFromOpenAI?.occasion) {
        const isExist = await this.topPriorityRepository.findOne({
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
        const data = await this.topPriorityRepository.create({
          name:
            responseFromOpenAI?.occasion.charAt(0).toUpperCase() +
            responseFromOpenAI?.occasion.slice(1),
          totalSearchTime: 1,
        });
        const savedIntoDb = await this.topPriorityRepository.save(data);
        return savedIntoDb;
      } else {
        throw new HttpException('Not valid', 422);
      }
    } catch (error) {
      throw new HttpException('Not valid', 422);
    }
    // try {
    //   const data = await this.topPriorityRepository.create({
    //     name: createTopPrioritySearchDto.name,
    //     totalSearchTime: 1,
    //   });
    //   const savedIntoDb = await this.topPriorityRepository.save(data);
    //   return savedIntoDb;
    // } catch (error) {
    //   throw new HttpException('Not valid', 422);
    // }
  }

  findAll() {
    return this.topPriorityRepository.find({
      order: {
        totalSearchTime: 'DESC',
      },
    });
  }
  findOne(id: number) {
    return this.topPriorityRepository.findOne({
      where: {
        id,
      },
    });
  }

  async update(
    id: number,
    updateTopPrioritySearchDto: UpdateTopPrioritySearchDto,
  ) {
    try {
      const previousData = await this.findOne(id);
      if (!previousData) {
        throw new NotFoundException('Not found');
      }
      return await this.topPriorityRepository.save({
        ...previousData,
        ...updateTopPrioritySearchDto,
      });
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async remove(id: number) {
    try {
      const isDelete = await this.topPriorityRepository.delete(id);
      if (isDelete?.affected <= 0) {
        throw new NotFoundException('Not Found any data against this id.');
      }

      return 'Successfully Deleted';
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
