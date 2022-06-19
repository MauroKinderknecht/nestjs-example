import { Injectable } from '@nestjs/common';

import { BaseRepository } from '@shared/repository';
import { PrismaService } from '@shared/service';

import { Brand } from '@models/brand/entities';

import { IBrandRepository } from '@brand/repository';

@Injectable()
export class BrandRepository extends BaseRepository<Brand> implements IBrandRepository {
  constructor(prisma: PrismaService) {
    super(prisma, 'brand');
  }

  async findByIdWithProducts(id: string): Promise<Brand> {
    return this.findOne({
      where: { id },
      include: { products: true },
    });
  }
}
