import { TeamsJSON, TeamRepository } from "./../repositories";
import { Team, TeamJSON, TeamName, TeamID } from "@juiz/team";

export class TeamService {
  teamRepo: TeamRepository;

  constructor() {
    this.teamRepo = new TeamRepository();
  }

  async findAllTeam(): Promise<{ entities: Array<Team> }> {
    const teamsJSON = await this.teamRepo.find<TeamsJSON>();

    return {
      entities: teamsJSON.entities.map(json => {
        return Team.fromJSON(json);
      })
    };
  }

  async findTeam(id: TeamID): Promise<Team> {
    const result = await this.findAllTeam();

    const team = result.entities.find(team => {
      return team.id === id;
    });

    return team;
  }

  async newTeam(newTeamName: TeamName): Promise<boolean> {
    if (await this.isTeamExists(newTeamName)) {
      return false;
    }

    // append to db/team.json
    const teamsJSON = await this.teamRepo.find<TeamsJSON>();
    const teams = [...teamsJSON.entities, Team.new(newTeamName).toJSON()];
    this.teamRepo.put({
      entities: teams
    });

    return true;
  }

  async isTeamExists(name: TeamName): Promise<boolean> {
    const teamsJSON = await this.teamRepo.find<TeamsJSON>();
    if (teamsJSON.entities.length <= 0) {
      return false;
    }

    const teamNames: Array<string> = teamsJSON.entities.map(
      (teamJSON: TeamJSON) => {
        return teamJSON.name;
      }
    );

    return teamNames.includes(name);
  }
}
