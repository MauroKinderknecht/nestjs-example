import { Prisma } from '@prisma/client';
import { Brand } from '../../brand/entities/brand.entity';
import { Price } from '../../price/entities/price.entity';

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
