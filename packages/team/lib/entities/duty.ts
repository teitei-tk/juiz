import { Entity, EntityJSON, Team, TeamJSON } from ".";

export type DutyID = string;
export type DutyName = string;

export interface DutyJSON extends EntityJSON {
  id: DutyID;
  name: DutyName;
  teams: TeamJSON[];
}

export class Duty extends Entity<DutyJSON> {
  public readonly name: DutyName;
  public readonly teams: Team[];

  public constructor(value: { id: DutyID; name: DutyName; teams: Team[] }) {
    super();
    this.id = value.id;
    this.name = value.name;

    this.teams = value.teams;
  }

  public toJSON(): DutyJSON {
    return {
      id: this.id,
      name: this.name,
      teams: this.teams.map(t => t.toJSON())
    };
  }

  public fromJSON(json: DutyJSON) {
    return Duty.fromJSON(json);
  }

  public static fromJSON(json: DutyJSON) {
    return new Duty({
      id: json.id,
      name: json.name,
      teams: json.teams.map(t => {
        return Team.fromJSON(t);
      })
    });
  }

  public static new(name: DutyName, teams: Team[]) {
    return new Duty({
      id: Duty.generateUUID(),
      name,
      teams
    });
  }
}
