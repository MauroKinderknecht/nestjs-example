import { Module } from '@nestjs/common';

import { execSync } from 'child_process';
import { join } from 'path';
import { URL } from 'url';
import { v4 } from 'uuid';

import { DatabaseService } from '@shared/service';

const generateDatabaseURL = (schema: string) => {
  if (!process.env.DATABASE_URL) {
    throw new Error('please provide a database url');
  }
  const url = new URL(process.env.DATABASE_URL);
  url.searchParams.append('schema', schema);
  return url.toString();
};

const schemaId = `test-${v4()}`;
const prismaBinary = join(__dirname, '..', 'node_modules', '.bin', 'prisma');

const url = generateDatabaseURL(schemaId);
process.env.DATABASE_URL = url;

class PrismaTestService extends DatabaseService {
  constructor() {
    super({
      datasources: { db: { url } },
    });
  }
}

const databaseServiceProvider = {
  provide: DatabaseService,
  useClass: PrismaTestService,
};

export const sync = () => {
  execSync(`${prismaBinary} db push`, {
    env: {
      ...process.env,
      DATABASE_URL: generateDatabaseURL(schemaId),
    },
  });
};

export const teardown = async (prisma: PrismaTestService) => {
  await prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${schemaId}" CASCADE;`);
  await prisma.$disconnect();
};

@Module({
  exports: [databaseServiceProvider],
  providers: [databaseServiceProvider],
})
export class SharedTestModule {}
