import { Test, TestingModule } from '@nestjs/testing';

import { NotFoundError } from '@shared/errors';

import { CreateBrandDTO } from '@models/brand/dto';
import { Brand } from '@models/brand/entities';

import { BrandController } from '@brand/controller';
import { BrandService, IBrandService } from '@brand/service';
import { IBrandRepository } from '@brand/repository';

import { DummyBrandRepository } from '../dummies';

describe('BrandController Unit Test', () => {
  let brandController: BrandController;
  let brandService: IBrandService;

  beforeEach(async () => {
    const brandServiceProvider = {
      provide: IBrandService,
      useClass: BrandService,
    };

    const brandRepositoryProvider = {
      provide: IBrandRepository,
      useClass: DummyBrandRepository,
    };

    const app: TestingModule = await Test.createTestingModule({
      controllers: [BrandController],
      providers: [brandRepositoryProvider, brandServiceProvider],
    }).compile();

    brandController = app.get<BrandController>(BrandController);
    brandService = app.get<IBrandService>(IBrandService);
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

  describe('getAllBrands', () => {
    it('if getAll() has no brands, should return empty array', async () => {
      jest.spyOn(brandService, 'findAll').mockImplementation(() => Promise.resolve([]));
      expect(await brandController.getAllBrands()).toEqual([]);
    });

    it('if getAll() has results should return an array of brands', async () => {
      const brands: Brand[] = [{ id: '1', name: 'Brand 1' }];
      jest.spyOn(brandService, 'findAll').mockImplementation(() => Promise.resolve(brands));
      expect(await brandController.getAllBrands()).toBe(brands);
    });
  });

  describe('getBrandWithProducts', () => {
    it('if getBrandWithProducts() has no brand, should throw not found error', async () => {
      jest.spyOn(brandService, 'findByIdWithProducts').mockImplementation(() => {
        throw new NotFoundError('Brand');
      });
      try {
        await brandController.getBrandWithProducts('1');
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundError);
      }
    });

    it('if getBrandWithProducts() has results should return a brand', async () => {
      const brand: Brand = { id: '1', name: 'Brand 1', products: [] };
      jest.spyOn(brandService, 'findByIdWithProducts').mockImplementation(() => Promise.resolve(brand));
      expect(await brandController.getBrandWithProducts('1')).toBe(brand);
    });
  });
});
