import { Github } from "./github";
import { Slack } from "./slack";

export type ServiceAccountID = number | string;
export type ServiceAccountName = string;

export enum Services {
  Github,
  Slack
}

export interface ServiceJSON {
  id: ServiceAccountID;
  name: ServiceAccountName;
  service: Services;
}

export interface ServiceAccountInterface {
  id: ServiceAccountID;
  name: ServiceAccountName;
  service: Services;

  toJSON(): ServiceJSON;
}

export { Github, Slack };
