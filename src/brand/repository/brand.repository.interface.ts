import { IBaseRepository } from '@shared/repository';

import { BrandModel } from '@brand/model';

export interface IBrandRepository extends IBaseRepository<BrandModel> {
  findByIdWithProducts(id: string): Promise<BrandModel>;
}
