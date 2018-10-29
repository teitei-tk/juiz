export interface IRead<T> {
  find<K>(id: K): Promise<{ entity: T }>;
  findAll<K>(ids: Array<K>): Promise<{ entities: Array<T> }>;
}
