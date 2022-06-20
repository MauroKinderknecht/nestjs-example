import { Test, TestingModule } from '@nestjs/testing';

import { CreateProductDTO } from '@models/product/dto';
import { Product } from '@models/product/entities';

import { ProductController } from '@product/controller';
import { ProductService, IProductService } from '@product/service';
import { IProductRepository } from '@product/repository';

import { DummyProductRepository } from '../dummies';

describe('ProductController Unit Test', () => {
  let productController: ProductController;
  let productService: IProductService;

  beforeEach(async () => {
    const productServiceProvider = {
      provide: IProductService,
      useClass: ProductService,
    };

    const productRepositoryProvider = {
      provide: IProductRepository,
      useClass: DummyProductRepository,
    };

    const app: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [productRepositoryProvider, productServiceProvider],
    }).compile();

    productController = app.get<ProductController>(ProductController);
    productService = app.get<IProductService>(IProductService);
  });

  describe('createProduct', () => {
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
      jest.spyOn(productService, 'create').mockImplementation(() => Promise.resolve(product));
      const result = await productController.createProduct(input);
      expect(result).toEqual(product);
    });
  });

  describe('getAllProducts', () => {
    it('if getAll() has no products, should return empty array', async () => {
      jest.spyOn(productService, 'findAll').mockImplementation(() => Promise.resolve([]));
      expect(await productController.getAllProducts()).toEqual([]);
    });

    it('if getAll() has results should return an array of products', async () => {
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
      jest.spyOn(productService, 'findAll').mockImplementation(() => Promise.resolve(products));
      expect(await productController.getAllProducts()).toBe(products);
    });
  });

  describe('searchProducts', () => {
    it('if search() has no products, should return empty array', async () => {
      jest.spyOn(productService, 'search').mockImplementation(() => Promise.resolve([]));
      expect(await productController.searchProducts('Test')).toEqual([]);
    });

    it('if getAll() has results should return an array of products', async () => {
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
      jest.spyOn(productService, 'search').mockImplementation(() => Promise.resolve(products));
      expect(await productController.searchProducts('Test')).toBe(products);
    });
  });
});
