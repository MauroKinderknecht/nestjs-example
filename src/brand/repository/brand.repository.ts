import { Injectable } from '@nestjs/common';
import { BaseRepository } from '@shared/repository';
import { PrismaService } from '@shared/service';

import { BrandModel } from '@brand/model';
import { IBrandRepository } from '@brand/repository';

@Injectable()
export class BrandRepository extends BaseRepository<BrandModel> implements IBrandRepository {
  constructor(prisma: PrismaService) {
    super(prisma, 'brand');
  }

  async findByIdWithProducts(id: string): Promise<BrandModel> {
    return this.findOne({
      where: { id },
      include: { products: true },
    });
  }
}
