import { Injectable } from '@nestjs/common';

import { BaseRepository } from '@shared/repository';
import { PrismaService } from '@shared/service';

import { Price } from '@models/price/entities';

import { IPriceRepository } from '@price/repository';

@Injectable()
export class PriceRepository extends BaseRepository<Price> implements IPriceRepository {
  constructor(prisma: PrismaService) {
    super(prisma, 'price');
  }

  findCurrentByProductId(productId: string, now: Date) {
    return this.findOne({
      where: {
        productId,
        asOf: { lte: now },
        until: { gte: now },
      },
      orderBy: { price: 'DESC' },
      distinct: ['offer'],
    });
  }
}
