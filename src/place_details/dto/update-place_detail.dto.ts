import { PartialType } from '@nestjs/mapped-types';
import { CreatePlaceDetailDto } from './create-place_detail.dto';

export class UpdatePlaceDetailDto extends PartialType(CreatePlaceDetailDto) {}
