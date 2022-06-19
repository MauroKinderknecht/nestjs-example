import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';

import { Brand } from '@models/brand/entities';
import { CreateBrandDTO } from '@models/brand/dto';

import { IBrandService } from '@brand/service';

@Controller('brand')
export class ProductController {
  constructor(@Inject(IBrandService) private readonly brandService: IBrandService) {}

  @Post()
  async createBrand(@Body() brand: CreateBrandDTO): Promise<Brand> {
    return await this.brandService.create(brand);
  }

  @Get()
  async getAllBrands(): Promise<Brand[]> {
    return await this.brandService.findAll();
  }

  @Get('/:id')
  async getBrandWithProducts(@Param('id') id: string): Promise<Brand> {
    return await this.brandService.findByIdWithProducts(id);
  }
}
