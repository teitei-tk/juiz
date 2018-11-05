import { newDataStoreClient, Repository } from ".";

import { Team, TeamJSON } from "@juiz/team";

export interface TeamsJSON {
  entities: ReadonlyArray<TeamJSON>;
}

export class TeamRepository extends Repository<Team> {
  setupDataStoreClient() {
    this.context = newDataStoreClient("team.json");
  }

  async find<TeamsJSON>(): Promise<TeamsJSON> {
    const result = await this.context.get<TeamsJSON>();
    if (result) {
      return result;
    }

    const initialData = Object.assign({
      entities: []
    });

    return Promise.resolve(initialData);
  }

  async put(json: TeamsJSON) {
    return await this.context.put(json);
  }
}
