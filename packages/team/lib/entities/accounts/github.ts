import {
  Services,
  ServiceJSON,
  ServiceAccount,
  ServiceAccountName
} from "./..";

export interface GithubJSON extends ServiceJSON {}

export class Github extends ServiceAccount<Services.Github> {
  readonly name: ServiceAccountName;

  constructor(value: GithubJSON) {
    super();

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
    return Object.assign(
      {},
      {
        id: this.id,
        name: this.name,
        displayName: this.displayName,
        service: Services.Github
      }
    );
  }

  static new(name: ServiceAccountName) {
    return new Github({
      id: Github.generateUUID(),
      name,
      service: Services.Github
    });
  }
}
