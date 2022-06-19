import { IBaseRepository } from '@shared/repository';

import { Brand } from '@models/brand/entities';

export abstract class IBrandRepository extends IBaseRepository<Brand> {
  abstract findByIdWithProducts(id: string): Promise<Brand>;
}
