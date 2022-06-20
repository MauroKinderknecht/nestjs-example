import { IsNotEmpty, IsOptional } from 'class-validator';
import { Offer } from '@prisma/client';

export class CreatePriceDTO {
  @IsNotEmpty()
  price: number;

  @IsOptional()
  offer?: Offer;

  @IsNotEmpty()
  productId: string;

  @IsOptional()
  asOf?: Date;

  @IsOptional()
  until?: Date;
}
