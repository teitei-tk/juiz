import { Github } from "./github";
import { Slack } from "./slack";

export type ServiceAccountID = number | string;
export type ServiceAccountName = string;

export enum Services {
  Github,
  Slack
}

export interface ServiceAccountInterface {
  id: ServiceAccountID;
  name: ServiceAccountName;
  service: Services;

  toJSON(): Object;
}

export { Github, Slack };
