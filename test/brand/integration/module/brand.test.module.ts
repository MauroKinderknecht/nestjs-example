import { Module } from '@nestjs/common';

import { BrandController } from '@brand/controller';
import { BrandService, IBrandService } from '@brand/service';
import { BrandRepository, IBrandRepository } from '@brand/repository';

import { SharedTestModule } from '../../../shared.test.module';

const brandServiceProvider = {
  provide: IBrandService,
  useClass: BrandService,
};

const brandRepositoryProvider = {
  provide: IBrandRepository,
  useClass: BrandRepository,
};

@Module({
  imports: [SharedTestModule],
  controllers: [BrandController],
  providers: [brandServiceProvider, brandRepositoryProvider],
})
export class BrandTestModule {}
