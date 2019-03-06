import {
  Services,
  ServiceJSON,
  ServiceAccount,
  ServiceAccountName
} from "./..";

export class Slack extends ServiceAccount<Services.Slack> {
  public readonly name: ServiceAccountName;

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

  public static fromJSON(value: ServiceJSON) {
    return new Slack(value);
  }

  public fromJSON(json: ServiceJSON) {
    return Slack.fromJSON(json);
  }

  public toJSON(): ServiceJSON {
    return Object.assign(
      {},
      {
        id: this.id,
        name: this.name,
        displayName: this.displayName,
        service: Services.Slack
      }
    );
  }
}
