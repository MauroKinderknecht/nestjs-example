export interface IBaseRepository<T extends { id: any }> {
  create(data: any): Promise<T>;
  findAll(): Promise<T[]>;
  findById(id: T['id']): Promise<T>;
  findMany(query: any): Promise<T[]>;
  findOne(query: any): Promise<T>;
}
