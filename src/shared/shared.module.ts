import { Module } from '@nestjs/common';

import { DatabaseService } from '@shared/service';
import { PrismaService } from '@shared/service/prisma/prisma.service';

const databaseServiceProvider = {
  provide: DatabaseService,
  useClass: PrismaService,
};

@Module({
  exports: [databaseServiceProvider],
  providers: [databaseServiceProvider],
})
export class SharedModule {}
