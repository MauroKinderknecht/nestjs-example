import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { CreateBrandDTO } from '@brand/dto';
import { BrandModel } from '@brand/model';
import { BrandService } from '@brand/service';

@Controller('brand')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @Post()
  async createBrand(@Body() brand: CreateBrandDTO): Promise<BrandModel> {
    return await this.brandService.create(brand);
  }

  @Get('/:id')
  async getBrandWithProducts(@Param('id') id: string): Promise<BrandModel> {
    return await this.brandService.findByIdWithProducts(id);
  }
}
