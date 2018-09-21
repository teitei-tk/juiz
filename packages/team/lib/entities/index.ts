export type ServiceAccountID = number | string;
export type ServiceAccountName = string;
export type ServiceType = string;

export interface ServiceAccountInterface {
  id: ServiceAccountID;
  name: ServiceAccountName;
  service: ServiceType;
}
