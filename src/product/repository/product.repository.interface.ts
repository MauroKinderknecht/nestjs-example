import { IBaseRepository } from '@shared/repository';

import { Product } from '@models/product/entities';

export abstract class IProductRepository extends IBaseRepository<Product> {
  abstract findByName(product: string): Promise<Product[]>;
}
