import { Module } from '@nestjs/common';
import { BrandModule } from '@brand/brand.module';

@Module({
  imports: [BrandModule],
})
export class AppModule {}
