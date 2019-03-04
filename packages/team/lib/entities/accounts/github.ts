import {
  Services,
  ServiceJSON,
  ServiceAccount,
  ServiceAccountName
} from "./..";

export class Github extends ServiceAccount<Services.Github> {
  public readonly name: ServiceAccountName;

  public constructor(value: ServiceJSON) {
    super();

    this.id = value.id;
    this.name = value.name;
    this.displayName = value.displayName;
    if (!value.displayName) {
      this.displayName = value.name;
    }

    this.service = Services.Github;
  }

  public static fromJSON(value: ServiceJSON) {
    return new Github(value);
  }

  public toJSON(): ServiceJSON {
    return {
      id: this.id,
      name: this.name,
      displayName: this.displayName,
      service: Services.Github
    };
  }
}
