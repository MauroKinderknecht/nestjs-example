import { Offer } from '@prisma/client';
import type { Product } from '@models/product/entities';

export class Price {
  id: string;
  offer: Offer;
  price: number;
  product?: Product;
  productId: string;
  asOf: Date;
  until: Date | null;
}
