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
  displayName?: ServiceAccountName;
  service?: Services;
  serviceId?: ServieIdentityID;
}

export abstract class ServiceAccount extends Entity<ServiceJSON> {
  public id: ServiceAccountID;
  public name: ServiceAccountName;
  public displayName: ServiceAccountName;
  public service: Services;
}
