import { PartialType } from '@nestjs/mapped-types';
import { CreateTrendingLocationDto } from './create-trending-location.dto';

export class UpdateTrendingLocationDto extends PartialType(CreateTrendingLocationDto) {}
