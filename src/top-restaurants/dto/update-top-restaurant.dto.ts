import { PartialType } from '@nestjs/mapped-types';
import { CreateTopRestaurantDto } from './create-top-restaurant.dto';

export class UpdateTopRestaurantDto extends PartialType(CreateTopRestaurantDto) {}
