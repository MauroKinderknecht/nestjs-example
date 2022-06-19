import { CreateBrandDTO } from '@brand/dto';
import { BrandModel } from '@brand/model';

export interface IBrandService {
  create(brand: CreateBrandDTO): Promise<BrandModel>;
  findByIdWithProducts(id: string): Promise<BrandModel>;
}
