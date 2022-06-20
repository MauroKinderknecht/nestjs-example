import { Module } from '@nestjs/common';

import { PriceController } from '@price/controller';
import { PriceService, IPriceService } from '@price/service';
import { PriceRepository, IPriceRepository } from '@price/repository';

import { SharedModule } from '@shared/shared.module';

const priceServiceProvider = {
  provide: IPriceService,
  useClass: PriceService,
};

const priceRepositoryProvider = {
  provide: IPriceRepository,
  useClass: PriceRepository,
};

@Module({
  imports: [SharedModule],
  controllers: [PriceController],
  providers: [priceServiceProvider, priceRepositoryProvider],
})
export class PriceModule {}
