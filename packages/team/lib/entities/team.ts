import { Entity, EntityJSON } from ".";
import { Account, AccountJSON } from "./account";

export type TeamID = string;
export type TeamName = string;

export interface TeamJSON extends EntityJSON {
  id: TeamID;
  name: TeamName;
  accounts?: AccountJSON[];
}

export class Team extends Entity<TeamJSON> {
  public readonly name: TeamName;
  public readonly accounts: Account[];

  public constructor(value: TeamJSON, accounts?: Account[]) {
    super();

    this.id = value.id;
    this.name = value.name;
    if (!accounts) {
      this.accounts = [];
    } else {
      this.accounts = accounts;
    }
  }

  public toJSON(): TeamJSON {
    return {
      id: this.id,
      name: this.name,
      accounts: this.accounts.map(account => {
        return account.toJSON();
      })
    };
  }

  public static fromJSON(json: TeamJSON): Team {
    const accounts: Account[] = [];
    if (json.accounts) {
      json.accounts.forEach(a => {
        accounts.push(Account.fromJSON(a));
      });
    }

    return new Team(
      {
        id: json.id,
        name: json.name
      },
      accounts
    );
  }

  public static new(name: TeamName): Team {
    return new Team({
      id: Team.generateUUID(),
      name: name
    });
  }
}
