import { PrismaClient } from '@prisma/client';

export class DatabaseService extends PrismaClient {
  constructor(options?: any) {
    super(options);
  }
}
