import { JSONClient } from "@juiz/datastore";
import { Read, Write } from ".";
import { Entity, EntityJSON } from "./../entities";

/**
 * @description
 * enforce define entity property
 *
 * @example
 * @injectEntity(Entity)
 * class FooRepo extends JSONRepository<Entity<EntityJSON>, EntityJSON> {}
 *
 * const repo = new FooRepo({
 *   context: new JSONClient("/tmp")
 * });
 *
 * console.log(repo);
 * > FooRepo {
 * >  context: JSONClient { jsonPath: '/tmp/json_client.json' },
 * >  entity: [Function: Entity]
 * > }
 */
export function injectEntity(entity: Function) {
  return function<T extends { new (...args: any[]): {} }>(constructor: T) {
    return class extends constructor {
      // eslint-disable-next-line @typescript-eslint/explicit-member-accessibility
      entity = entity;
    };
  };
}

export abstract class JSONRepository<E extends Entity<J>, J extends EntityJSON>
  implements Read<E>, Write<E> {
  protected readonly context: JSONClient;
  protected readonly entity: E; // code for passing through the compiler

  public constructor(arg: { context: JSONClient }) {
    this.context = arg.context;
  }

  public find(): Promise<{ entity: E }> {
    const entity = this.entity.fromJSON(this.context.get<J>()) as E;

    return Promise.resolve({
      entity
    });
  }

  public create(entity: E): Promise<{ entity: E }> {
    this.context.create(entity.toJSON());

    return Promise.resolve({
      entity
    });
  }

  public update(entity: E): Promise<{ entity: E }> {
    this.context.put(entity.toJSON());

    return Promise.resolve({
      entity
    });
  }

  public delete(entity?: E): Promise<{ entity: E }> {
    this.context.delete();

    return Promise.resolve({
      entity
    });
  }
}
