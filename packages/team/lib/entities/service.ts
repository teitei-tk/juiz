import { Entity, EntityJSON } from ".";

export type ServiceAccountID = string;
export type ServiceAccountName = string;
export type ServieIdentityID = number | string;

export enum Services {
  Github = 0,
  Slack = 1
}

export interface ServiceJSON extends EntityJSON {
  id: ServiceAccountID;
  name: ServiceAccountName;
  displayName?: ServiceAccountName;
  service: Services;
  serviceId?: ServieIdentityID;
}

export abstract class ServiceAccount<S extends Services> extends Entity<
  ServiceJSON
> {
  public name: ServiceAccountName;
  public displayName: ServiceAccountName;
  public service: S;
}
