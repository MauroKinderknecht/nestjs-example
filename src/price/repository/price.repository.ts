import { Injectable } from '@nestjs/common';

import { BaseRepository } from '@shared/repository';
import { DatabaseService } from '@shared/service';

import { Price } from '@models/price/entities';

import { IPriceRepository } from '@price/repository';

@Injectable()
export class PriceRepository extends BaseRepository<Price> implements IPriceRepository {
  constructor(db: DatabaseService) {
    super(db, 'price');
  }

  findCurrentByProductId(productId: string, now: Date): Promise<Price[]> {
    return this.findMany({
      where: {
        productId,
        asOf: { lte: now },
        until: { gte: now },
      },
      orderBy: { price: 'desc' },
      distinct: ['offer'],
    });
  }
}
