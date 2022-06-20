import { IsOptional } from 'class-validator';

export class UpdatePriceDTO {
  @IsOptional()
  price?: number;
  @IsOptional()
  until?: Date;
}
