import { v4 } from "uuid";

export type ServiceAccountID = number | string;
export type ServiceAccountName = string;
export type ServiceType = string;

export interface ServiceAccountInterface {
  id: ServiceAccountID;
  name: ServiceAccountName;
  service: ServiceType;
}

export type EntityID = string;
export type EntityName = string;

export interface EntityJSON {
  id: EntityID;
  name: EntityName;
}

export abstract class Entity<I, N, J> {
  id: I;
  name: N;

  abstract toJSON(): J;

  static fromJSON(json: any): any {
    throw new Error("not implemented");
  }

  static generateUUID(): string {
    return v4();
  }
}
