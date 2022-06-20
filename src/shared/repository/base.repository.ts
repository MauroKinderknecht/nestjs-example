import { InvalidModelError } from '@shared/errors';
import { IBaseRepository } from '@shared/repository';
import { DatabaseService, Models } from '@shared/service';

export class BaseRepository<T extends { id: any }> implements IBaseRepository<T> {
  constructor(private readonly db: DatabaseService, private readonly model: string) {
    if (!Models.includes(model)) throw new InvalidModelError(`Model ${model} already exists`);
  }

  async create(data: any): Promise<T> {
    return this.db[this.model].create({ data });
  }

  async findAll(): Promise<T[]> {
    return this.db[this.model].findMany();
  }

  async findById(id: T['id']): Promise<T> {
    return this.db[this.model].findUnique({ where: { id } });
  }

  async findMany(query: any): Promise<T[]> {
    return this.db[this.model].findMany({ ...query });
  }

  findOne(query: any): Promise<T> {
    return this.db[this.model].findFirst({ ...query });
  }
}
