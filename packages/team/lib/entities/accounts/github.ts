import {
  Services,
  ServiceAccountID,
  ServiceAccountName,
  ServiceAccountInterface
} from ".";

export interface GithubJSON {
  id: string;
  name: string;
  service: number;
}

export class Github implements ServiceAccountInterface {
  readonly id: ServiceAccountID;
  readonly name: ServiceAccountName;
  readonly service: Services.Github;

  constructor(value: GithubJSON) {
    this.id = value.id;
    this.name = value.name;
    this.service = value.service;
  }

  static fromJSON(value: GithubJSON) {
    return new Github(value);
  }
  toJSON(): GithubJSON {
    return Object.assign({
      id: this.id,
      name: this.name,
      service: this.service
    });
  }
}
