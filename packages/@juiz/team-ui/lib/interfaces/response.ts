import { TeamJSON } from "@juiz/team";

export interface IAllTeamsResponse {
  data: {
    entities: Array<TeamJSON>;
  };
}

export interface ITeamResponse {
  data: TeamJSON;
}
