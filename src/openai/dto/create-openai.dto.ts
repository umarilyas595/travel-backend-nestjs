import { IsNotEmpty } from 'class-validator';

export class CreateOpenaiDto {
  @IsNotEmpty()
  content: string;
}
