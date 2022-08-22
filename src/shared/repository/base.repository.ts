import { InvalidModelError } from '@shared/errors';
import { IBaseRepository } from '@shared/repository';
import { DatabaseService, Models } from '@shared/service';

export class BaseRepository<T extends { id: any }> implements IBaseRepository<T> {
  constructor(private readonly db: DatabaseService, private readonly model: string) {
    if (!Models.includes(model)) throw new InvalidModelError(`Model ${model} already exists`);
  }
  async create(data: any): Promise<T> {
    return this.service.db[this.model].create({ data });
  }

  async update(id: T["id"], data: any): Promise<T> {
    return this.service.db[this.model].update({ where: { id }, data });
  }

  async updateMany(where: any, data: any): Promise<T[]> {
    return this.service.db[this.model].update({ where, data });
  }

  async findAll(): Promise<T[]> {
    return this.service.db[this.model].findMany();
  }

  async findById(id: T['id']): Promise<T> {
    return this.service.db[this.model].findUnique({ where: { id } });
  }

  async findOne(where: any, query?: any): Promise<T> {
    return this.service.db[this.model].findFirst({ where, ...query });
  }

  async findMany(where: any, query?: any): Promise<T[]> {
    return this.service.db[this.model].findMany({ where, ...query });
  }

  async deleteById(id: T["id"]): Promise<T> {
    return this.service.db[this.model].delete({ where: { id }});
  }

  async deleteOne(where: any): Promise<T> {
    return this.service.db[this.model].delete({ where });
  }

  async deleteMany(where: any): Promise<T[]> {
    return this.service.db[this.model].deleteMany({ where });
  }
  
}
