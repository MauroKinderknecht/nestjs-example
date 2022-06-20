import { Price } from '@models/price/entities';
import { CreatePriceDTO } from '@models/price/dto';

export abstract class IPriceService {
  abstract create(price: CreatePriceDTO): Promise<Price>;
  abstract findAll(): Promise<Price[]>;
  abstract findCurrentByProductId(productId: string): Promise<Price[]>;
}
