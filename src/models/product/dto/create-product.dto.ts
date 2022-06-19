import { Prisma } from '@prisma/client';

export class CreateProductDTO {
  sku: string;
  model: string;
  name: string;
  specs: Prisma.InputJsonValue;
  reviews: number;
}
