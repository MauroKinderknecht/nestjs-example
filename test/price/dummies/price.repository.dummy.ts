import { Injectable } from '@nestjs/common';

import { Price } from '@models/price/entities';

import { IPriceRepository } from '@price/repository';

@Injectable()
export class DummyPriceRepository implements IPriceRepository {
  create(data: any): Promise<Price> {
    return Promise.resolve(undefined);
  }

  findAll(): Promise<Price[]> {
    return Promise.resolve([]);
  }

  findById(id: Price['id']): Promise<Price> {
    return Promise.resolve(undefined);
  }

  findMany(query: any): Promise<Price[]> {
    return Promise.resolve([]);
  }

  findOne(query: any): Promise<Price> {
    return Promise.resolve(undefined);
  }

  findCurrentByProductId(productId: string, now: Date): Promise<Price[]> {
    return Promise.resolve([]);
  }
}
