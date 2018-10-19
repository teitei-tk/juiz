export interface IRead<T, K> {
  find(id: K): Promise<{ entity: T }>;
  findAll(ids: Array<K>): Promise<{ entities: Array<T> }>;
}
