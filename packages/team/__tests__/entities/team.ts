import { Team, Services, Account } from "../../lib";

describe("team.entities.team", () => {
  describe("Team", () => {
    it("#constructor", () => {
      const id = Team.generateUUID();
      const name = "HappyTeam";

      const team = new Team({
        id: id,
        name: name
      });

      expect(team.name).toBe(name);
      expect(team.id).toBe(id);
      expect(team.id).not.toBe(Team.generateUUID());
      expect(team.accounts.length).toBe(0);

      const accountJson = {
        id: "aaaaaaaa",
        name: "teitei_tk",
        serviceAccounts: [
          {
            id: "a",
            name: "teitei-tk",
            service: Services.GitHub
          },
          {
            id: "a",
            name: "teitei_tk",
            service: Services.Slack
          }
        ]
      };
      const teamWithAccounts = new Team(
        {
          id,
          name
        },
        [Account.fromJSON(accountJson)]
      );

      expect(teamWithAccounts.name).toBe(name);
      expect(teamWithAccounts.id).toBe(id);

      expect(teamWithAccounts.accounts[0].id).toBe(accountJson.id);
      expect(teamWithAccounts.accounts[0].name).toBe(accountJson.name);

      const github = teamWithAccounts.accounts[0].serviceAccounts[0];
      expect(github.name).toBe(accountJson.serviceAccounts[0].name);
      expect(github.service).toBe(accountJson.serviceAccounts[0].service);

      const slack = teamWithAccounts.accounts[0].serviceAccounts[1];
      expect(slack.name).toBe(accountJson.serviceAccounts[1].name);
      expect(slack.service).toBe(accountJson.serviceAccounts[1].service);
    });

    it("#toJSON", () => {
      const json = {
        id: "aaaaaaaa",
        name: "teitei_tk",
        serviceAccounts: [
          {
            id: "a",
            name: "teitei-tk",
            service: Services.GitHub
          },
          {
            id: "a",
            name: "teitei_tk",
            service: Services.Slack
          }
        ]
      };

      const account = Account.fromJSON(json);
      expect(account.toJSON()).not.toBe(json);

      const expectJson = {
        id: "aaaaaaaa",
        name: "teitei_tk",
        serviceAccounts: [
          {
            id: "a",
            displayName: "teitei-tk",
            name: "teitei-tk",
            service: Services.GitHub
          },
          {
            id: "a",
            displayName: "teitei_tk",
            name: "teitei_tk",
            service: Services.Slack
          }
        ]
      };

      const expectAccount = Account.fromJSON(expectJson);
      expect(expectAccount.toJSON()).toEqual(expectJson);
    });

    it("#fromJSON", () => {
      const teamName = "HappyTeam";
      const teamJson = {
        id: Team.generateUUID(),
        name: teamName
      };

      const team = Team.fromJSON(teamJson);
      expect(team.name).toBe(teamName);
      expect(team.accounts.length).toBe(0);

      const accountJson = {
        id: "aaaaaaaa",
        name: "teitei_tk",
        serviceAccounts: [
          {
            id: "a",
            name: "teitei-tk",
            service: Services.GitHub
          },
          {
            id: "a",
            name: "teitei_tk",
            service: Services.Slack
          }
        ]
      };

      const newTeamJson = Object.assign({}, teamJson, {
        accounts: [accountJson]
      });

      const newTeam = Team.fromJSON(newTeamJson);
      expect(newTeam.id).toBe(newTeamJson.id);
      expect(newTeam.name).toBe(newTeamJson.name);
      expect(newTeam.name).toBe(teamName);

      expect(newTeam.accounts[0].id).toBe(accountJson.id);
      expect(newTeam.accounts[0].name).toBe(accountJson.name);

      const github = newTeam.accounts[0].findServiceAccount(Services.GitHub);
      expect(github.service).toBe(
        newTeamJson.accounts[0].serviceAccounts[0].service
      );

      expect(github.id).toBe(newTeamJson.accounts[0].serviceAccounts[0].id);
      expect(github.name).toBe(newTeamJson.accounts[0].serviceAccounts[0].name);

      const slack = newTeam.accounts[0].findServiceAccount(Services.Slack);
      expect(slack.service).toBe(
        newTeamJson.accounts[0].serviceAccounts[1].service
      );

      expect(slack.id).toBe(newTeamJson.accounts[0].serviceAccounts[1].id);
      expect(slack.name).toBe(newTeamJson.accounts[0].serviceAccounts[1].name);
    });

    it("#new", () => {
      const teamName = "happyTeams";
      const team = Team.new(teamName);

      expect(team.name).toBe(teamName);
      expect(team.accounts.length).toBe(0);
    });

    it("#generateUUID", () => {
      const firstID = Team.generateUUID();
      const secondID = Team.generateUUID();

      expect(firstID).not.toBe(secondID);
    });
  });
});
