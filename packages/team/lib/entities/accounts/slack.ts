import {
  Services,
  ServiceJSON,
  ServiceAccount,
  ServiceAccountName
} from "./../service";

export interface SlackJSON extends ServiceJSON {}

export class Slack extends ServiceAccount<Services.Slack> {
  readonly name: ServiceAccountName;

  constructor(value: SlackJSON) {
    super();

    this.id = value.id;
    this.name = value.name;
    this.displayName = value.displayName;
    if (!value.displayName) {
      this.displayName = value.name;
    }

    this.service = Services.Slack;
  }

  static fromJSON(value: SlackJSON) {
    return new Slack(value);
  }

  toJSON(): SlackJSON {
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
