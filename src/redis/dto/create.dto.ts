import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
export class CreateDto {
  @IsNotEmpty()
  @IsString()
  key: string;

  @IsNotEmpty()
  @IsString()
  value: string;

  @IsOptional()
  @IsNumber()
  expiresIn: number;
}
