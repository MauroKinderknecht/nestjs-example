import { Test, TestingModule } from '@nestjs/testing';

import { CreatePriceDTO } from '@models/price/dto';
import { Price } from '@models/price/entities';

import { PriceService, IPriceService } from '@price/service';
import { PriceRepository, IPriceRepository } from '@price/repository';
import { SharedModule } from '@shared/shared.module';

describe('PriceController Unit Test', () => {
  let priceService: IPriceService;
  let priceRepository: IPriceRepository;

  beforeEach(async () => {
    const priceServiceProvider = {
      provide: IPriceService,
      useClass: PriceService,
    };

    const priceRepositoryProvider = {
      provide: IPriceRepository,
      useClass: PriceRepository,
    };

    const app: TestingModule = await Test.createTestingModule({
      imports: [SharedModule],
      providers: [priceRepositoryProvider, priceServiceProvider],
    }).compile();

    priceService = app.get<IPriceService>(IPriceService);
    priceRepository = app.get<IPriceRepository>(IPriceRepository);
  });

  describe('create', () => {
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
      jest.spyOn(priceRepository, 'create').mockImplementation(() => Promise.resolve(price));
      const result = await priceService.create(input);
      expect(result).toEqual(price);
    });
  });

  describe('findCurrentByProductId', () => {
    it('if findCurrentByProductId() has no prices, should return empty array', async () => {
      jest.spyOn(priceRepository, 'findCurrentByProductId').mockImplementation(() => Promise.resolve([]));
      expect(await priceService.findCurrentByProductId('1')).toEqual([]);
    });

    it('if findCurrentByProductId() has results should return an array of prices', async () => {
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
      jest.spyOn(priceRepository, 'findCurrentByProductId').mockImplementation(() => Promise.resolve(prices));
      expect(await priceService.findCurrentByProductId('1')).toBe(prices);
    });
  });
});
