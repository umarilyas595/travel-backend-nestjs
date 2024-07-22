import { HttpException, Injectable } from '@nestjs/common';
import { CreateWorldCoutriesCityDto } from './dto/create-world-coutries-city.dto';
import { UpdateWorldCoutriesCityDto } from './dto/update-world-coutries-city.dto';
import { WorldCoutriesCity } from './entities/world-coutries-city.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class WorldCoutriesCitiesService {
  constructor(
    @InjectRepository(WorldCoutriesCity)
    private allLocationRepository: Repository<WorldCoutriesCity>,
  ) {}

  async initializeDatabase() {
    try {
      const countriesToSeed = [
        {
          city: 'Jiaozuo',
          city_ascii: 'Jiaozuo',
          country: 'China',
          iso2: 'CN',
          iso3: 'CHN',
          admin_name: 'Henan',
        },
        {
          city: 'Nordvik',
          city_ascii: 'Nordvik',
          country: 'Russia',
          iso2: 'RU',
          iso3: 'RUS',
          admin_name: 'Krasnoyarskiy Kray',
        },
      ];

      // Loop through the countries and save them into the database
      for (let i = 0; i < countriesToSeed.length; ++i) {
        // Save each country into the database
        await this.allLocationRepository.save(countriesToSeed[i]);
      }

      return 'Data saved into the database';
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  create(createWorldCoutriesCityDto: CreateWorldCoutriesCityDto) {
    return 'This action adds a new worldCoutriesCity';
  }

  findAll() {
    return `This action returns all worldCoutriesCities`;
  }

  findOne(id: number) {
    return `This action returns a #${id} worldCoutriesCity`;
  }

  update(id: number, updateWorldCoutriesCityDto: UpdateWorldCoutriesCityDto) {
    return `This action updates a #${id} worldCoutriesCity`;
  }

  remove(id: number) {
    return `This action removes a #${id} worldCoutriesCity`;
  }

  async searchWorldCountriesCity(queryString: string) {
    const queryBuilder = this.allLocationRepository
      .createQueryBuilder('wcc')
      .where('wcc.city ILIKE :query', { query: `%${queryString}%` })
      .orWhere('wcc.city_ascii ILIKE :query', { query: `%${queryString}%` })
      .orWhere('wcc.iso2 ILIKE :query', { query: `%${queryString}%` })
      .orWhere('wcc.iso3 ILIKE :query', { query: `%${queryString}%` })
      .orWhere('wcc.country ILIKE :query', { query: `%${queryString}%` })
      .orWhere('wcc.admin_name ILIKE :query', { query: `%${queryString}%` });

    const results = await queryBuilder.getMany();
    return results;
  }

  async fetchWorldCountriesCityWithPagination(page: number, pageSize = 10) {
    const skip = (page - 1) * pageSize; // Calculate the number of records to skip
    const locations = this.allLocationRepository.find({
      order: {
        id: 'DESC',
      },
      take: pageSize,
      skip,
    });

    return locations;
  }
}
