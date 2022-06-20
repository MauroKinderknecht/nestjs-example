import { Prisma } from '@prisma/client';
import { IsNotEmpty } from 'class-validator';

export class CreateProductDTO {
  @IsNotEmpty()
  sku: string;

  @IsNotEmpty()
  model: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  specs: Prisma.InputJsonValue;

  @IsNotEmpty()
  reviews: number;

  @IsNotEmpty()
  brandId: string;
}
