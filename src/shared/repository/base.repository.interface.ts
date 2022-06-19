export abstract class IBaseRepository<T extends { id: any }> {
  abstract create(data: any): Promise<T>;
  abstract findAll(): Promise<T[]>;
  abstract findById(id: T['id']): Promise<T>;
  abstract findMany(query: any): Promise<T[]>;
  abstract findOne(query: any): Promise<T>;
}
