import { Entity } from ".";

import { Team, TeamJSON } from "./team";

export type DutyID = string;
export type DutyName = string;

export interface DutyJSON {
  id: DutyID;
  name: DutyName;
  teams: Array<TeamJSON>;
}

export class Duty extends Entity<DutyID, DutyName, DutyJSON> {
  readonly teams: Array<Team>;

  constructor(value: { id: DutyID; name: DutyName; teams: Array<Team> }) {
    super();
    this.id = value.id;
    this.name = value.name;

    this.teams = value.teams;
  }

  toJSON(): DutyJSON {
    return Object.assign(
      {},
      {
        id: this.id,
        name: this.name,
        teams: this.teams.map(t => t.toJSON())
      }
    );
  }

  static fromJSON(json: DutyJSON) {
    return new Duty({
      id: json.id,
      name: json.name,
      teams: json.teams.map(t => {
        return Team.fromJSON(t);
      })
    });
  }

  static new(name: DutyName, teams: Array<Team>) {
    return new Duty({
      id: Duty.generateUUID(),
      name,
      teams
    });
  }
}
