import { Prisma } from '@prisma/client';
import { IsOptional } from 'class-validator';

export class UpdateProductDTO {
  @IsOptional()
  sku?: string;

  @IsOptional()
  model?: string;

  @IsOptional()
  name?: string;

  @IsOptional()
  specs?: Prisma.InputJsonValue;

  @IsOptional()
  reviews?: number;
}
