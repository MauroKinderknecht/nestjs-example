import { Injectable } from '@nestjs/common';

import { BaseRepository } from '@shared/repository';
import { DatabaseService } from '@shared/service';

import { Brand } from '@models/brand/entities';

import { IBrandRepository } from '@brand/repository';

@Injectable()
export class BrandRepository extends BaseRepository<Brand> implements IBrandRepository {
  constructor(db: DatabaseService) {
    super(db, 'brand');
  }

  async findByIdWithProducts(id: string): Promise<Brand> {
    return this.findOne({
      where: { id },
      include: { products: true },
    });
  }
}
