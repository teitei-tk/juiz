import { v4 } from "uuid";

import { ServiceAccountInterface } from "./accounts";

export type AccountID = string;
export type AccountName = string;

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
