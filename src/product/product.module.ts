import { Module } from '@nestjs/common';

import { ProductController } from '@product/controller';
import { ProductService, IProductService } from '@product/service';
import { ProductRepository, IProductRepository } from '@product/repository';

import { SharedModule } from '@shared/shared.module';

const productServiceProvider = {
  provide: IProductService,
  useClass: ProductService,
};

const productRepositoryProvider = {
  provide: IProductRepository,
  useClass: ProductRepository,
};

@Module({
  imports: [SharedModule],
  controllers: [ProductController],
  providers: [productServiceProvider, productRepositoryProvider],
})
export class ProductModule {}
