import { v4 } from "uuid";

import { Account, AccountJSON } from "./account";

export type TeamID = string;
export type TeamName = string;

export interface TeamJSON {
  id: TeamID;
  name: TeamName;
  accounts?: Array<AccountJSON>;
}

export class Team {
  readonly id: TeamID;
  readonly name: TeamName;
  readonly accounts: Array<Account>;

  constructor(value: TeamJSON, accounts?: Array<Account>) {
    this.id = value.id;
    this.name = value.name;
    if (!accounts) {
      this.accounts = [];
    } else {
      this.accounts = accounts;
    }
  }

  toJSON(): TeamJSON {
    return Object.assign(
      {},
      {
        id: this.id,
        name: this.name,
        accounts: this.accounts.map(account => {
          return account.toJSON();
        })
      }
    );
  }

  static fromJSON(json: TeamJSON): Team {
    if (json.accounts) {
      return new Team(
        {
          id: json.id,
          name: json.name
        },
        json.accounts.map(account => {
          return Account.fromJSON(account);
        })
      );
    }

    return new Team(
      {
        id: json.id,
        name: json.name
      },
      []
    );
  }

  static new(name: TeamName): Team {
    return new Team({
      id: Team.generateUUID(),
      name: name
    });
  }

  static generateUUID(): TeamID {
    return v4();
  }
}
