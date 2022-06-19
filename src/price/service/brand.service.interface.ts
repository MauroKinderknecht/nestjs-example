import { Brand } from '@models/brand/entities';
import { CreateBrandDTO } from '@models/brand/dto';

export abstract class IBrandService {
  abstract create(brand: CreateBrandDTO): Promise<Brand>;
  abstract findAll(): Promise<Brand[]>;
  abstract findByIdWithProducts(id: string): Promise<Brand>;
}
