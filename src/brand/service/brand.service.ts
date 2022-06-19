import { Inject, Injectable } from '@nestjs/common';

import { CreateBrandDTO } from '@brand/dto';
import { BrandModel } from '@brand/model';
import { BrandRepository, IBrandRepository } from '@brand/repository';
import { IBrandService } from '@brand/service';

@Injectable()
export class BrandService implements IBrandService {
  constructor(@Inject(BrandRepository) private readonly repository: IBrandRepository) {}

  async create(brand: CreateBrandDTO): Promise<BrandModel> {
    return this.repository.create(brand);
  }

  async findByIdWithProducts(id: string): Promise<BrandModel> {
    return this.repository.findByIdWithProducts(id);
  }
}
