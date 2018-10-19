import {
  Services,
  ServiceJSON,
  ServiceAccountID,
  ServiceAccountName,
  ServiceAccountInterface
} from ".";

export interface GithubJSON extends ServiceJSON {}

export class Github implements ServiceAccountInterface {
  readonly id: ServiceAccountID;
  readonly name: ServiceAccountName;
  readonly displayName: ServiceAccountName;
  readonly service: Services.Github;

  constructor(value: GithubJSON) {
    this.id = value.id;
    this.name = value.name;
    this.displayName = value.displayName;
    if (!value.displayName) {
      this.displayName = value.name;
    }

    this.service = Services.Github;
  }

  static fromJSON(value: GithubJSON) {
    return new Github(value);
  }

  toJSON(): GithubJSON {
    return Object.assign({
      id: this.id,
      name: this.name,
      displayName: this.displayName,
      service: Services.Github
    });
  }
}
