import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';

import { Product } from '@models/product/entities';
import { CreateProductDTO } from '@models/product/dto';

import { IProductService } from '@product/service';

@Controller('product')
export class ProductController {
  constructor(@Inject(IProductService) private readonly productService: IProductService) {}

  @Post()
  async createProduct(@Body() product: CreateProductDTO): Promise<Product> {
    return await this.productService.create(product);
  }

  @Get()
  async getAllProducts(): Promise<Product[]> {
    return await this.productService.findAll();
  }

  @Get('/:id')
  async getProductWithProducts(@Param('id') id: string): Promise<Product> {
    return await this.productService.findByIdWithProducts(id);
  }
}
