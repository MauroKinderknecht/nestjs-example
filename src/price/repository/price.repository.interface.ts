import { IBaseRepository } from '@shared/repository';

import { Price } from '@models/price/entities';

export abstract class IPriceRepository extends IBaseRepository<Price> {
  abstract findCurrentByProductId(productId: string, now: Date);
}
