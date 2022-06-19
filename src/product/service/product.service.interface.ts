import { Product } from '@models/product/entities';
import { CreateProductDTO } from '@models/product/dto';

export abstract class IProductService {
  abstract create(product: CreateProductDTO): Promise<Product>;
  abstract findAll(): Promise<Product[]>;
  abstract findByIdWithProducts(id: string): Promise<Product>;
}
