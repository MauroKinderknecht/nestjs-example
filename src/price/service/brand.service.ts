import { Inject, Injectable } from '@nestjs/common';

import { NotFoundError } from '@shared/errors';

import { CreateBrandDTO } from '@models/brand/dto';
import { Brand } from '@models/brand/entities';

import { IBrandRepository } from '@brand/repository';
import { IBrandService } from '@brand/service';

@Injectable()
export class BrandService implements IBrandService {
  constructor(@Inject(IBrandRepository) private readonly repository: IBrandRepository) {}

  async create(brand: CreateBrandDTO): Promise<Brand> {
    return this.repository.create(brand);
  }

  async findByIdWithProducts(id: string): Promise<Brand> {
    const brand = await this.repository.findByIdWithProducts(id);
    if (!brand) throw new NotFoundError('Brand');
    return brand;
  }

  async findAll() {
    return this.repository.findAll();
  }
}
