import { Entity, EntityJSON } from ".";
import { Account, AccountJSON } from "./account";

export type TeamID = string;
export type TeamName = string;

export interface TeamJSON extends EntityJSON {
  id: TeamID;
  name: TeamName;
  accounts?: Array<AccountJSON>;
}

export class Team extends Entity<TeamJSON> {
  readonly name: TeamName;
  readonly accounts: Array<Account>;

  constructor(value: TeamJSON, accounts?: Array<Account>) {
    super();

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
}
