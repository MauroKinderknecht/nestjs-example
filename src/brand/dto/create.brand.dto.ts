import { Prisma } from '@prisma/client';

export type CreateBrandDTO = Prisma.BrandCreateWithoutProductsInput;
