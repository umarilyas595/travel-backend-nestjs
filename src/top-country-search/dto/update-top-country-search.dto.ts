import { PartialType } from '@nestjs/mapped-types';
import { CreateTopCountrySearchDto } from './create-top-country-search.dto';

export class UpdateTopCountrySearchDto extends PartialType(CreateTopCountrySearchDto) {}
