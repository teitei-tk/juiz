import { v4 } from "uuid";

export type EntityID = string;
export type EntityName = string;

export interface EntityJSON {
  id: EntityID;
}

export abstract class Entity<J extends EntityJSON> {
  public id: EntityID;

  public abstract toJSON(): J;

  public static generateUUID(): string {
    return v4();
  }
}
