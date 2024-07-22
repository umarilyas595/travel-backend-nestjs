import { IsNotEmpty, IsString } from 'class-validator';
export class CreateTopCountrySearchDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}
