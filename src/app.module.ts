import { Module } from '@nestjs/common';
import { BrandModule } from '@brand/brand.module';
import { ProductModule } from '@product/product.module';

@Module({
  imports: [BrandModule, ProductModule],
})
export class AppModule {}
