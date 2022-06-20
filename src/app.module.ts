import { Module } from '@nestjs/common';
import { BrandModule } from '@brand/brand.module';
import { PriceModule } from '@price/price.module';
import { ProductModule } from '@product/product.module';

@Module({
  imports: [BrandModule, PriceModule, ProductModule],
})
export class AppModule {}
