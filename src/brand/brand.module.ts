import { Module } from '@nestjs/common';
import { BrandController } from '@brand/controller';
import { BrandService } from '@brand/service';
import { BrandRepository } from '@brand/repository';
import { SharedModule } from '@shared/shared.module';

@Module({
  imports: [SharedModule],
  controllers: [BrandController],
  providers: [BrandService, BrandRepository],
})
export class BrandModule {}
