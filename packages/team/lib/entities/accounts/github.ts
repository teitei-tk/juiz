import { Services, ServiceJSON, ServiceAccount } from "./../service";

export interface GithubJSON extends ServiceJSON {}

export class Github extends ServiceAccount<Services.Github> {
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
}
