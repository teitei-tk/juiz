import { JSONClient } from "@juiz/datastore";

import { Entity, EntityJSON, IRepository } from "@juiz/team";

export abstract class Repository<T extends Entity<EntityJSON>>
  implements IRepository<T> {
  context: JSONClient;

  create(json: T): Promise<{ entity: T }> {
    this.context.put(json.toJSON());

    return Promise.resolve({
      entity: json
    });
  }

  update(json: T) {
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

  find(): Promise<{ entity: T }> {
    const j = this.context.get<EntityJSON>();
    return Promise.resolve({
      entity: Entity.fromJSON(j) as T
    });
  }

  findAll() {
    throw new Error("not supported");

    return Promise.resolve({
      entities: []
    });
  }
}
