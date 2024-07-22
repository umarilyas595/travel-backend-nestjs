import { PartialType } from '@nestjs/mapped-types';
import { CreateTrendingActivityDto } from './create-trending-activity.dto';

export class UpdateTrendingActivityDto extends PartialType(CreateTrendingActivityDto) {}
