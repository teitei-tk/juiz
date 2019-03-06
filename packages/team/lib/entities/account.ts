import {
  Entity,
  EntityJSON,
  ServiceAccount,
  ServiceJSON,
  Services,
  Slack,
  Github
} from ".";

export type AccountID = string;
export type AccountName = string;

export interface AccountJSON extends EntityJSON {
  id: AccountID;
  name: AccountName;
  serviceAccounts: ServiceJSON[];
}

export class Account extends Entity<AccountJSON> {
  public readonly name: AccountName;
  public readonly serviceAccounts?: ServiceAccount<Services>[];

  public constructor(
    value: {
      id: AccountID;
      name: AccountName;
    },
    accounts?: ServiceAccount<Services>[]
  ) {
    super();

    this.id = value.id;
    this.name = value.name;

    if (!accounts) {
      accounts = [];
    }

    this.serviceAccounts = accounts;
  }

  public appendServiceAccount(serviceAccount: ServiceAccount<Services>): void {
    this.serviceAccounts.push(serviceAccount);
  }

  public findServiceAccount(service: Services): ServiceAccount<Services> {
    return this.serviceAccounts.find(r => {
      return r.service == service;
    });
  }

  public toJSON(): AccountJSON {
    return {
      id: this.id,
      name: this.name,
      serviceAccounts: this.serviceAccounts.map(account => {
        return account.toJSON();
      })
    };
  }

  public fromJSON(json: AccountJSON) {
    return Account.fromJSON(json);
  }

  public static fromJSON(json: AccountJSON) {
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

  public static new(name: AccountName): Account {
    return new Account({
      id: Account.generateUUID(),
      name: name
    });
  }
}
