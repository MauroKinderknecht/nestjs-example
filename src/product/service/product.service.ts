import { Inject, Injectable } from '@nestjs/common';

import { NotFoundError } from '@shared/errors';

import { CreateProductDTO } from '@models/product/dto';
import { Product } from '@models/product/entities';

import { IProductRepository } from '@product/repository';
import { IProductService } from '@product/service';

@Injectable()
export class ProductService implements IProductService {
  constructor(@Inject(IProductRepository) private readonly repository: IProductRepository) {}

  async create(product: CreateProductDTO): Promise<Product> {
    return this.repository.create(product);
  }

  async findAll() {
    return this.repository.findAll();
  }

  search(product: string): Promise<Product[]> {
    return this.repository.findByName(product);
  }
}
