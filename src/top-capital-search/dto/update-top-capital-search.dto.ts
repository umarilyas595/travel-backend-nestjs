import { PartialType } from '@nestjs/mapped-types';
import { CreateTopCapitalSearchDto } from './create-top-capital-search.dto';

export class UpdateTopCapitalSearchDto extends PartialType(CreateTopCapitalSearchDto) {}
