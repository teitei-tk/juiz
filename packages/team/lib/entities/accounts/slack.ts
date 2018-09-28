import {
  Services,
  ServieJSON,
  ServiceAccountID,
  ServiceAccountName,
  ServiceAccountInterface
} from ".";

export interface SlackJSON extends ServieJSON {}

export class Slack implements ServiceAccountInterface {
  readonly id: ServiceAccountID;
  readonly name: ServiceAccountName;
  readonly service: Services.Slack;

  constructor(value: SlackJSON) {
    this.id = value.id;
    this.name = value.name;
    this.service = Services.Slack;
  }

  static fromJSON(value: SlackJSON) {
    return new Slack(value);
  }

  toJSON(): SlackJSON {
    return Object.assign({
      id: this.id,
      name: this.name,
      service: Services.Slack
    });
  }
}
