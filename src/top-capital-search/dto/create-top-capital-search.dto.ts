import { IsNotEmpty, IsString } from 'class-validator';
export class CreateTopCapitalSearchDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}
