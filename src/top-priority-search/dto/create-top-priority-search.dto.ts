import { IsNotEmpty, IsString } from 'class-validator';
export class CreateTopPrioritySearchDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}
