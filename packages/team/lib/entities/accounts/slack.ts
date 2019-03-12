import {
  Services,
  ServiceAccount,
  ServiceJSON,
  ServiceAccountName
} from "./..";

export class Slack extends ServiceAccount {
  public readonly name: ServiceAccountName;
  public readonly displayName: ServiceAccountName;
  public readonly service: Services.Slack;

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

  public fromJSON(json: ServiceJSON): Slack {
    return Slack.fromJSON(json);
  }

  public toJSON(): ServiceJSON {
    return {
      id: this.id,
      name: this.name,
      displayName: this.displayName,
      service: this.service
    };
  }

  public static new(name: ServiceAccountName): Slack {
    return new Slack({
      id: Slack.generateUUID(),
      name,
      service: Services.Slack
    });
  }
}
