import { IsOptional } from 'class-validator';

export class UpdateBrandDTO {
  @IsOptional()
  name?: string;
}
