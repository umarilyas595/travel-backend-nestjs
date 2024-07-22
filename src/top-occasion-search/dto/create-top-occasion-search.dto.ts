import { IsNotEmpty, IsString } from 'class-validator';
export class CreateTopOccasionSearchDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}
