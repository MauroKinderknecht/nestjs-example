import { InvalidModelError } from '@shared/errors';
import { IBaseRepository } from '@shared/repository';
import { Models, PrismaService } from '@shared/service';

export class BaseRepository<T extends { id: any }> implements IBaseRepository<T> {
  constructor(private readonly prisma: PrismaService, private readonly model: string) {
    if (!Models.includes(model)) throw new InvalidModelError(`Model ${model} already exists`);
  }

  async create(data: any): Promise<T> {
    return this.prisma[this.model].create({ data });
  }

  async findAll(): Promise<T[]> {
    return this.prisma[this.model].findMany();
  }

  async findById(id: T['id']): Promise<T> {
    return this.prisma[this.model].findUnique({ where: { id } });
  }

  findMany(query: any): Promise<T[]> {
    return this.prisma[this.model].findMany({ query });
  }

  findOne(query: any): Promise<T> {
    return this.prisma[this.model].findFirst({ query });
  }
}
