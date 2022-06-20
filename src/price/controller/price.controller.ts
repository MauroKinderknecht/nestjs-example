import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';

import { Price } from '@models/price/entities';
import { CreatePriceDTO } from '@models/price/dto';

import { IPriceService } from '@price/service';

@Controller('price')
export class PriceController {
  constructor(@Inject(IPriceService) private readonly priceService: IPriceService) {}

  @Post()
  async createPrice(@Body() price: CreatePriceDTO): Promise<Price> {
    return await this.priceService.create(price);
  }

  @Get('/:productId')
  async getCurrentPrice(@Param('productId') productId: string): Promise<Price[]> {
    return await this.priceService.findCurrentByProductId(productId);
  }
}
