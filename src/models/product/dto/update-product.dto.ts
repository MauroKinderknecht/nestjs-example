import { Prisma } from '@prisma/client';

export class UpdateProductDTO {
  sku?: string;
  model?: string;
  name?: string;
  specs?: Prisma.InputJsonValue;
  reviews?: number;
}
