import { PartialType } from '@nestjs/mapped-types';
import { CreateWorldCoutriesCityDto } from './create-world-coutries-city.dto';

export class UpdateWorldCoutriesCityDto extends PartialType(CreateWorldCoutriesCityDto) {}
