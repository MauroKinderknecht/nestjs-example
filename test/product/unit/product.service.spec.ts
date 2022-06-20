import { Test, TestingModule } from '@nestjs/testing';

import { CreateProductDTO } from '@models/product/dto';
import { Product } from '@models/product/entities';

import { ProductService, IProductService } from '@product/service';
import { ProductRepository, IProductRepository } from '@product/repository';
import { SharedModule } from '@shared/shared.module';

describe('ProductController Unit Test', () => {
  let productService: IProductService;
  let productRepository: IProductRepository;

  beforeEach(async () => {
    const productServiceProvider = {
      provide: IProductService,
      useClass: ProductService,
    };

    const productRepositoryProvider = {
      provide: IProductRepository,
      useClass: ProductRepository,
    };

    const app: TestingModule = await Test.createTestingModule({
      imports: [SharedModule],
      providers: [productRepositoryProvider, productServiceProvider],
    }).compile();

    productService = app.get<IProductService>(IProductService);
    productRepository = app.get<IProductRepository>(IProductRepository);
  });

  describe('create', () => {
    it('should return a product', async () => {
      const input: CreateProductDTO = {
        sku: '1',
        model: '1',
        specs: {
          color: 'red',
        },
        reviews: 4.5,
        name: 'Test Product',
        brandId: '1',
      };
      const product: Product = {
        id: '1',
        sku: '1',
        model: '1',
        specs: {
          color: 'red',
        },
        reviews: 4.5,
        name: 'Test Product',
        brandId: '1',
      };
      jest.spyOn(productRepository, 'create').mockImplementation(() => Promise.resolve(product));
      const result = await productService.create(input);
      expect(result).toEqual(product);
    });
  });

  describe('findAll', () => {
    it('if findAll() has no products, should return empty array', async () => {
      jest.spyOn(productRepository, 'findAll').mockImplementation(() => Promise.resolve([]));
      expect(await productService.findAll()).toEqual([]);
    });

    it('if findAll() has results should return an array of products', async () => {
      const products: Product[] = [
        {
          id: '1',
          sku: '1',
          model: '1',
          specs: {
            color: 'red',
          },
          reviews: 4.5,
          name: 'Test Product',
          brandId: '1',
        },
      ];
      jest.spyOn(productRepository, 'findAll').mockImplementation(() => Promise.resolve(products));
      expect(await productService.findAll()).toBe(products);
    });
  });

  describe('search', () => {
    it('if search() has no products, should return empty array', async () => {
      jest.spyOn(productRepository, 'findByName').mockImplementation(() => Promise.resolve([]));
      expect(await productService.search('Test')).toEqual([]);
    });

    it('if search() has results should return an array of products', async () => {
      const products: Product[] = [
        {
          id: '1',
          sku: '1',
          model: '1',
          specs: {
            color: 'red',
          },
          reviews: 4.5,
          name: 'Test Product',
          brandId: '1',
        },
      ];
      jest.spyOn(productRepository, 'findByName').mockImplementation(() => Promise.resolve(products));
      expect(await productService.search('Test')).toBe(products);
    });
  });
});
