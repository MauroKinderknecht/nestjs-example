import { Test, TestingModule } from '@nestjs/testing';

import { CreateBrandDTO } from '@models/brand/dto';
import { Brand } from '@models/brand/entities';

import { BrandService, IBrandService } from '@brand/service';
import { BrandRepository, IBrandRepository } from '@brand/repository';

describe('BrandController Unit Test', () => {
  let brandService: IBrandService;
  let brandRepository: IBrandRepository;

  beforeEach(async () => {
    const brandServiceProvider = {
      provide: IBrandService,
      useClass: BrandService,
    };

    const brandRepositoryProvider = {
      provide: IBrandRepository,
      useClass: BrandRepository,
    };

    const app: TestingModule = await Test.createTestingModule({
      providers: [brandRepositoryProvider, brandServiceProvider],
    }).compile();

    brandService = app.get<IBrandService>(IBrandService);
    brandRepository = app.get<IBrandRepository>(IBrandRepository);
  });

  describe('createBrand', () => {
    const brand: Brand = {
      id: '1',
      name: 'Test Brand',
    };

    it('should return a brand', async () => {
      const input: CreateBrandDTO = {
        name: 'Test Brand',
      };
      jest.spyOn(brandService, 'create').mockImplementation(() => Promise.resolve(brand));
      const result = await brandController.createBrand(input);
      expect(result).toEqual(brand);
    });
  });
});
