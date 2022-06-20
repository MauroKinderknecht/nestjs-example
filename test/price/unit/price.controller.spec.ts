import { Test, TestingModule } from '@nestjs/testing';

import { CreatePriceDTO } from '@models/price/dto';
import { Price } from '@models/price/entities';

import { PriceController } from '@price/controller';
import { PriceService, IPriceService } from '@price/service';
import { IPriceRepository } from '@price/repository';

import { DummyPriceRepository } from '../dummies';

describe('PriceController Unit Test', () => {
  let priceController: PriceController;
  let priceService: IPriceService;

  beforeEach(async () => {
    const priceServiceProvider = {
      provide: IPriceService,
      useClass: PriceService,
    };

    const priceRepositoryProvider = {
      provide: IPriceRepository,
      useClass: DummyPriceRepository,
    };

    const app: TestingModule = await Test.createTestingModule({
      controllers: [PriceController],
      providers: [priceRepositoryProvider, priceServiceProvider],
    }).compile();

    priceController = app.get<PriceController>(PriceController);
    priceService = app.get<IPriceService>(IPriceService);
  });

  describe('createPrice', () => {
    it('should return a price', async () => {
      const input: CreatePriceDTO = {
        productId: '1',
        price: 420,
        offer: 'SALE',
        asOf: new Date(),
      };
      const price: Price = {
        id: '1',
        productId: '1',
        price: 420,
        offer: 'SALE',
        asOf: new Date(),
        until: null,
      };
      jest.spyOn(priceService, 'create').mockImplementation(() => Promise.resolve(price));
      const result = await priceController.createPrice(input);
      expect(result).toEqual(price);
    });
  });

  describe('getCurrentPrice', () => {
    it('if getAll() has no prices, should return empty array', async () => {
      jest.spyOn(priceService, 'findCurrentByProductId').mockImplementation(() => Promise.resolve([]));
      expect(await priceController.getCurrentPrice('1')).toEqual([]);
    });

    it('if getAll() has results should return an array of prices', async () => {
      const prices: Price[] = [
        {
          id: '1',
          productId: '1',
          price: 420,
          offer: 'SALE',
          asOf: new Date(),
          until: null,
        },
        {
          id: '2',
          productId: '1',
          price: 450,
          offer: 'NORMAL',
          asOf: new Date(),
          until: null,
        },
      ];
      jest.spyOn(priceService, 'findCurrentByProductId').mockImplementation(() => Promise.resolve(prices));
      expect(await priceController.getCurrentPrice('1')).toBe(prices);
    });
  });
});
