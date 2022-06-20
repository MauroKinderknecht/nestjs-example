import { Prisma } from '@prisma/client';
import type { Brand } from '@models/brand/entities';
import type { Price } from '@models/price/entities';

export class Product {
  id: string;
  sku: string;
  model: string;
  name: string;
  specs: Prisma.JsonValue;
  reviews: number;
  brand?: Brand;
  brandId: string;
  Price?: Price[];
}
