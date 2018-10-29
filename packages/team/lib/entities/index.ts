import { v4 } from "uuid";

export type EntityID = string;
export type EntityName = string;

export interface EntityJSON {
  id: EntityID;
}

export abstract class Entity<J extends EntityJSON> {
  id: EntityID;

  abstract toJSON(): J;

  static fromJSON(json: any): any {
    throw new Error("not implemented");
  }

  static generateUUID(): string {
    return v4();
  }
}
