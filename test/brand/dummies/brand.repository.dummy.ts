import { Injectable } from '@nestjs/common';

import { Brand } from '@models/brand/entities';

import { IBrandRepository } from '@brand/repository';

@Injectable()
export class DummyBrandRepository implements IBrandRepository {
  create(data: any): Promise<Brand> {
    return Promise.resolve(undefined);
  }

  findAll(): Promise<Brand[]> {
    return Promise.resolve([]);
  }

  findById(id: Brand['id']): Promise<Brand> {
    return Promise.resolve(undefined);
  }

  findByIdWithProducts(id: string): Promise<Brand> {
    return Promise.resolve(undefined);
  }

  findMany(query: any): Promise<Brand[]> {
    return Promise.resolve([]);
  }

  findOne(query: any): Promise<Brand> {
    return Promise.resolve(undefined);
  }
}
