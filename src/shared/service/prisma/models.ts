import { PrismaClient } from '@prisma/client';

export const Models = Object.getOwnPropertyNames(new PrismaClient()).filter(
  (model) =>
    !['disconnect', 'connect', 'executeRaw', 'queryRaw', 'transaction', 'on'].includes(model) && !model.startsWith('_'),
);
