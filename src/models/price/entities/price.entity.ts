import { Offer } from '@prisma/client';
import { Product } from '../../product/entities/product.entity';

export class Price {
  id: string;
  offer: Offer;
  price: number;
  product?: Product;
  productId: string;
  asOf: Date;
  until: Date | null;
}
