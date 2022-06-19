import { IBaseRepository } from '@shared/repository';

import { Product } from '@models/product/entities';

export abstract class IProductRepository extends IBaseRepository<Product> {
  abstract findByIdWithProducts(id: string): Promise<Product>;
}
