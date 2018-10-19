# juiz/team package

[![npm (scoped)](https://img.shields.io/npm/v/@juiz/team.svg?style=flat-square)](https://www.npmjs.com/package/@juiz/team)

team developments utility logic(Shuffle, Notify, CodeReview Request, etc)

# How to

```typescript
// do repository interfaces override.
import { JSONClient } from "@juiz/datastore"
import { Team } from "@juiz/team/entities/team";
import { ITeamRepository } from "@juiz/team/repositories/interfaces/team";

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

(async () => {
  const repo = new TeamRepository(
    new JSONClient("/tmp/foo");
  );

  const id = Team.generateUUID();
  const name = "GithubTeam";
  const accountJson = {
    id: 'a70db95d-1d8e-4cd9-ad25-0b2f10babd20',
    name: "teitei_tk",
    serviceAccounts: [
      {
        id: '1032869f-8967-4209-bcc3-9daf234e8328',
        name: "teitei-tk",
        displayName: 'teitei-tk',
        service: 0
      },
      {
        id: 'a193784a-6511-4e64-bd7e-25b02bdbc671',
        name: "teitei_tk",
        displayName: 'teitei_tk',
        service: 1
      }
    ]
  };

  const team = new Team({
    id,
    name
  });

  repo.create(Team)
  const account = await repo.find();
  console.log(account.toJSON());
  /*
    {
      id: 'b4d77b82-ee15-484a-8585-cf381e8d4692',
      name: 'GithubTeam',
      accounts:[
        {
          id: 'a70db95d-1d8e-4cd9-ad25-0b2f10babd20',
          name: 'teitei_tk',
          serviceAccounts: [
            {
              id: '1032869f-8967-4209-bcc3-9daf234e8328',
              name: 'teitei-tk',
              displayName: 'teitei-tk',
              service: 0
            },
            {
              id: 'a193784a-6511-4e64-bd7e-25b02bdbc671',
              name: 'teitei_tk',
              displayName: 'john teitei_tk doe',
              service: 1
            }
          ]
        }
      ]
    }
  */
});
```
