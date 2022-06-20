import { Test, TestingModule } from '@nestjs/testing';

import { CreateBrandDTO } from '@models/brand/dto';
import { Brand } from '@models/brand/entities';

import { BrandService, IBrandService } from '@brand/service';
import { BrandRepository, IBrandRepository } from '@brand/repository';
import { NotFoundError } from '@shared/errors';
import { SharedModule } from "@shared/shared.module";

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
      imports: [SharedModule],
      providers: [brandRepositoryProvider, brandServiceProvider],
    }).compile();

    brandService = app.get<IBrandService>(IBrandService);
    brandRepository = app.get<IBrandRepository>(IBrandRepository);
  });

  describe('createBrand', () => {
    it('should return a brand', async () => {
      const brand: Brand = {
        id: '1',
        name: 'Test Brand',
      };
      const input: CreateBrandDTO = {
        name: 'Test Brand',
      };
      jest.spyOn(brandRepository, 'create').mockImplementation(() => Promise.resolve(brand));
      const result = await brandService.create(input);
      expect(result).toEqual(brand);
    });
  });

  describe('findAll', () => {
    it('if findAll() has no brands, should return empty array', async () => {
      jest.spyOn(brandRepository, 'findAll').mockImplementation(() => Promise.resolve([]));
      expect(await brandService.findAll()).toEqual([]);
    });

    it('if findAll() has results should return an array of brands', async () => {
      const brands: Brand[] = [{ id: '1', name: 'Brand 1' }];
      jest.spyOn(brandRepository, 'findAll').mockImplementation(() => Promise.resolve(brands));
      expect(await brandService.findAll()).toBe(brands);
    });
  });

  describe('findByIdWithProducts', () => {
    it('if findByIdWithProducts() has no brand, should throw not found error', async () => {
      jest.spyOn(brandRepository, 'findByIdWithProducts').mockImplementation(() => Promise.resolve(null));
      try {
        await brandService.findByIdWithProducts('1');
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundError);
      }
    });

    it('if findByIdWithProducts() has results should return a brand', async () => {
      const brand: Brand = { id: '1', name: 'Brand 1', products: [] };
      jest.spyOn(brandRepository, 'findByIdWithProducts').mockImplementation(() => Promise.resolve(brand));
      expect(await brandService.findByIdWithProducts('1')).toBe(brand);
    });
  });
});
