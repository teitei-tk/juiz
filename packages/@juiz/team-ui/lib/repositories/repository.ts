import { JSONClient } from "@juiz/datastore";

import { Entity, EntityJSON, IRepository } from "@juiz/team";

export interface JSONResponse {
  entities: Array<EntityJSON>;
}

export abstract class Repository<T extends Entity<EntityJSON>>
  implements IRepository<T> {
  context: JSONClient;

  create(json: T): Promise<{ entity: T }> {
    this.context.put(json.toJSON());

    return Promise.resolve({
      entity: json
    });
  }

  async update(json: T) {
    const r = await this.find();
    this.context.put(json.toJSON());

    return Promise.resolve({
      entity: json
    });
  }

  delete(json?: T) {
    this.context.delete();

    return Promise.resolve({
      entity: json
    });
  }

  find<J>(): Promise<{ entity: T }> {
    const j = this.context.get<J>();
    return Promise.resolve({
      entity: Entity.fromJSON(j) as T;
    });
  }

  findAll() {
    throw new Error("not supported");

    return Promise.resolve({
      entities: []
    });
  }
}
