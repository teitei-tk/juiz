import { v4 } from "uuid";

import {
  ServiceJSON,
  ServiceAccountInterface,
  Services,
  Github,
  Slack
} from "./accounts";

export type AccountID = string;
export type AccountName = string;

export interface AccountJSON {
  id: string;
  name: string;
  serviceAccounts: Array<ServiceJSON>;
}

export class Account {
  readonly id: AccountID;
  readonly name: AccountName;
  readonly serviceAccounts?: Array<ServiceAccountInterface>;

  constructor(
    value: {
      id: AccountID;
      name: AccountName;
    },
    accounts?: Array<ServiceAccountInterface>
  ) {
    this.id = value.id;
    this.name = value.name;

    if (!accounts) {
      accounts = [];
    }

    this.serviceAccounts = accounts;
  }

  appendServiceAccount(serviceAccount: ServiceAccountInterface): void {
    this.serviceAccounts.push(serviceAccount);
  }

  findServiceAccount(service: Services): ServiceAccountInterface {
    return this.serviceAccounts.find(r => {
      return r.service == service;
    });
  }

  toJSON(): AccountJSON {
    return Object.assign({
      id: this.id,
      name: this.name,
      serviceAccounts: this.serviceAccounts.map(account => {
        return account.toJSON();
      })
    });
  }

  static fromJSON(json: AccountJSON) {
    const serviceAccounts = json.serviceAccounts.map(obj => {
      if (obj.service == Services.Github) {
        return Github.fromJSON(obj);
      } else {
        return Slack.fromJSON(obj);
      }
    });

    return new Account(
      {
        id: json.id,
        name: json.name
      },
      serviceAccounts
    );
  }

  static new(name: AccountName): Account {
    return new Account({
      id: Account.generateUUID(),
      name: name
    });
  }

  static generateUUID(): AccountID {
    return v4();
  }
}
