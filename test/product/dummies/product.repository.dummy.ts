import { Injectable } from '@nestjs/common';

import { Product } from '@models/product/entities';

import { IProductRepository } from '@product/repository';

@Injectable()
export class DummyProductRepository implements IProductRepository {
  create(data: any): Promise<Product> {
    return Promise.resolve(undefined);
  }

  findAll(): Promise<Product[]> {
    return Promise.resolve([]);
  }

  findById(id: Product["id"]): Promise<Product> {
    return Promise.resolve(undefined);
  }

  findMany(query: any): Promise<Product[]> {
    return Promise.resolve([]);
  }

  findOne(query: any): Promise<Product> {
    return Promise.resolve(undefined);
  }

  findByName(product: string): Promise<Product[]> {
    return Promise.resolve([]);
  }
}
