import { v4 } from "uuid";

<<<<<<< HEAD
import { ServiceAccountInterface } from ".";
=======
import { ServiceAccountInterface } from "./accounts";
>>>>>>> account typing

export type AccountID = string;
export type AccountName = string;

export class Account {
<<<<<<< HEAD
  id: AccountID;
  name: AccountName;
  accounts?: Array<ServiceAccountInterface>;
=======
  readonly id: AccountID;
  readonly name: AccountName;
  readonly serviceAccounts?: Array<ServiceAccountInterface>;
>>>>>>> account typing

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
<<<<<<< HEAD
    this.accounts = accounts;
  }

  appendServiceAccount(serviceAccount: ServiceAccountInterface): void {
    this.accounts.push(serviceAccount);
=======
    this.serviceAccounts = accounts;
  }

  appendServiceAccount(serviceAccount: ServiceAccountInterface): void {
    this.serviceAccounts.push(serviceAccount);
>>>>>>> account typing
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
