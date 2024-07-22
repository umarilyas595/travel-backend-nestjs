import { PartialType } from '@nestjs/mapped-types';
import { CreateTopPrioritySearchDto } from './create-top-priority-search.dto';

export class UpdateTopPrioritySearchDto extends PartialType(CreateTopPrioritySearchDto) {}
