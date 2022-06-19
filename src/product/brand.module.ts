import { Module } from '@nestjs/common';

import { BrandController } from '@brand/controller';
import { BrandService, IBrandService } from '@brand/service';
import { BrandRepository, IBrandRepository } from '@brand/repository';

import { SharedModule } from '@shared/shared.module';

const brandServiceProvider = {
  provide: IBrandService,
  useClass: BrandService,
};

const brandRepositoryProvider = {
  provide: IBrandRepository,
  useClass: BrandRepository,
};

@Module({
  imports: [SharedModule],
  controllers: [BrandController],
  providers: [brandServiceProvider, brandRepositoryProvider],
})
export class BrandModule {}
