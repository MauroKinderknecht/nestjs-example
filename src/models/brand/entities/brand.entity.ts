import { Product } from '../../product/entities/product.entity';

export class Brand {
  id: string;
  name: string;
  products?: Product[];
}
