import { PartialType } from '@nestjs/mapped-types';
import { CreateTopOccasionSearchDto } from './create-top-occasion-search.dto';

export class UpdateTopOccasionSearchDto extends PartialType(CreateTopOccasionSearchDto) {}
