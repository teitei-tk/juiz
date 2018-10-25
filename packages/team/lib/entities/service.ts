import { Entity } from ".";

export type ServiceAccountID = number | string;
export type ServiceAccountName = string;

export enum Services {
  Github = 0,
  Slack = 1
}

export interface ServiceJSON {
  id: ServiceAccountID;
  name: ServiceAccountName;
  displayName?: ServiceAccountName;
  service: Services;
}

export abstract class ServiceAccount<S> extends Entity<
  ServiceAccountID,
  ServiceAccountName,
  ServiceJSON
> {
  displayName: ServiceAccountName;
  service: S;
}
