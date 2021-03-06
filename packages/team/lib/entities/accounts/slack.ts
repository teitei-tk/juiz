import { Services, ServiceJSON, ServiceAccount } from "./..";

export class Slack extends ServiceAccount {
  public constructor(value: ServiceJSON) {
    super();

    this.id = value.id;
    this.name = value.name;
    this.displayName = value.displayName;
    if (!value.displayName) {
      this.displayName = value.name;
    }

    this.service = Services.Slack;
  }

  public static fromJSON(value: ServiceJSON): Slack {
    return new Slack(value);
  }

  public toJSON(): ServiceJSON {
    return {
      id: this.id,
      name: this.name,
      displayName: this.displayName,
      service: Services.Slack
    };
  }
}
