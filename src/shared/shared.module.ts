import { Module } from '@nestjs/common';

import { PrismaService } from '@shared/service';

@Module({
  exports: [PrismaService],
  providers: [PrismaService],
})
export class SharedModule {}
