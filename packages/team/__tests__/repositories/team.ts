import { JSONClient } from "@juiz/datastore";

import { Services } from "./../../lib/entities/service";
import { Account } from "./../../lib/entities/account";
import { Team, TeamJSON } from "./../../lib/entities/team";
import { ITeamRepository } from "./../../lib/repositories/interfaces/team";

class TeamRepository implements ITeamRepository {
  context: JSONClient;

  constructor(context: JSONClient) {
    this.context = context;
  }

  create(json: Team): Promise<{ entity: Team }> {
    this.context.create(json.toJSON());

    return Promise.resolve({
      entity: json
    });
  }

  update(json: Team) {
    this.context.put(json.toJSON());

    return Promise.resolve({
      entity: json
    });
  }

  delete(json?: Team) {
    this.context.delete();

    return Promise.resolve({
      entity: json
    });
  }

  find(): Promise<{ entity: Team }> {
    const j = this.context.get<TeamJSON>();
    return Promise.resolve({
      entity: Team.fromJSON(j)
    });
  }

  findAll() {
    throw new Error("not supported");

    return Promise.resolve({
      entities: []
    });
  }
}

describe("team.repositories.team", () => {
  let repo: TeamRepository;

  beforeAll(() => {
    const json = new JSONClient("/tmp/foo");
    repo = new TeamRepository(json);
  });

  afterEach(() => {
    repo.delete();
  });

  it("#create", async () => {
    const id = Team.generateUUID();
    const name = "HappyTeam";

    const team = new Team({
      id,
      name
    });

    const result = await repo.create(team);
    expect(result.entity.id).toBe(id);
    expect(result.entity.name).toBe(name);

    const otherTeamName = "NextTeam";

    const otherTeam = new Team({
      id,
      name: otherTeamName
    });

    const nextResult = await repo.create(otherTeam);
    expect(nextResult.entity.name).not.toBe(result.entity.name);
  });

  it("#update", async () => {
    const id = Team.generateUUID();
    const name = "HappyTeam";

    const accountJson = {
      id: "aaaaaaaa",
      name: "teitei_tk",
      serviceAccounts: [
        {
          id: "a",
          name: "teitei-tk",
          service: Services.Github
        },
        {
          id: "a",
          name: "teitei_tk",
          service: Services.Slack
        }
      ]
    };
    const team = new Team(
      {
        id,
        name
      },
      [Account.fromJSON(accountJson)]
    );

    const result = await repo.create(team);
    expect(result.entity.id).toBe(id);
    expect(result.entity.name).toBe(name);

    const newTeam = Team.fromJSON(
      Object.assign({}, team.toJSON(), { name: "newTeam" })
    );
    const nextResult = await repo.update(newTeam);
    expect(nextResult.entity.id).toBe(id);
    expect(nextResult.entity.id).toBe(result.entity.id);
  });

  it("#find", async () => {
    const id = Team.generateUUID();
    const name = "HappyTeam";

    const team = new Team({
      id,
      name
    });

    const result = await repo.create(team);
    expect(result.entity.id).toBe(id);

    const nextResult = await repo.find();
    expect(nextResult.entity.id).toBe(id);
  });
});
