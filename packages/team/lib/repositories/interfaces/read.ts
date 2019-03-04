export interface Read<T> {
  find<K>(id: K): Promise<{ entity: T }>;
  findAll<K>(ids: K[]): Promise<{ entities: T[] }>;
}
