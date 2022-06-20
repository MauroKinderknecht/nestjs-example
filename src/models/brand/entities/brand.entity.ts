import type { Product } from '@models/product/entities';

export class Brand {
  id: string;
  name: string;
  products?: Product[];
}
