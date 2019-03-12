import { Entity, EntityJSON } from ".";

export type ServiceAccountID = string;
export type ServiceAccountName = string;
export type ServieIdentityID = number | string;

export enum Services {
  GitHub = 0,
  Slack = 1
}

export interface ServiceJSON extends EntityJSON {
  id: ServiceAccountID;
  name: ServiceAccountName;
  service: Services;
  displayName?: ServiceAccountName;
}

export abstract class ServiceAccount extends Entity<ServiceJSON> {
  public readonly name: ServiceAccountName;
  public readonly service: Services;
}
