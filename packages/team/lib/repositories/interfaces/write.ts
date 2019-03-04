export interface Write<T> {
  create(entity: T): Promise<{ entity: T }>;
  update(entity: T): Promise<{ entity: T }>;
  delete(entity: T): Promise<{ entity: T }>;
}
