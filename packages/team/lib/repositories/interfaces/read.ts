export interface Read<T> {
  find<K>(id: K): Promise<{ entity: T }>;
}
