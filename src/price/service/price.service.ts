import { Inject, Injectable } from '@nestjs/common';

import { NotFoundError } from '@shared/errors';

import { CreatePriceDTO } from '@models/price/dto';
import { Price } from '@models/price/entities';

import { IPriceRepository } from '@price/repository';
import { IPriceService } from '@price/service';

@Injectable()
export class PriceService implements IPriceService {
  constructor(@Inject(IPriceRepository) private readonly repository: IPriceRepository) {}

  async create(price: CreatePriceDTO): Promise<Price> {
    return this.repository.create(price);
  }

  async findCurrentByProductId(productId: string): Promise<Price[]> {
    const now = new Date();
    return this.repository.findCurrentByProductId(productId, now);
  }

  async findAll() {
    return this.repository.findAll();
  }
}
