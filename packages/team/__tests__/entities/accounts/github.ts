import { Services, GitHub } from "../../../lib";

describe("team.entities.accounts.Github", () => {
  describe("Github", () => {
    it("#constructor", () => {
      const id = "aaa";
      const name = "teitei_tk";

      const github = new GitHub({
        id: id,
        name: name,
        service: Services.GitHub
      });

      expect(github.id).toBe(id);
      expect(github.name).toBe(name);
      expect(github.displayName).toBe(name);
      expect(github.service).toBe(Services.GitHub);
    });

    it("displayName", () => {
      const name = "teitei_tk";
      const displayName = "teitei-tk";

      const github = new GitHub({
        id: "aaa",
        name: name,
        displayName: displayName,
        service: Services.GitHub
      });

      expect(github.name).toBe(name);
      expect(github.displayName).not.toBe(name);
      expect(github.displayName).not.toBe(github.name);
      expect(github.displayName).toBe(displayName);
    });

    it("#fromJSON", () => {
      const github = GitHub.fromJSON({
        id: "aaa",
        name: "teitei_tk",
        service: Services.GitHub
      });

      expect(github.service).toBe(Services.GitHub);
    });

    it("#toJSON", () => {
      const github = new GitHub({
        id: "aaa",
        name: "teitei_tk",
        service: Services.GitHub
      });

      const GithubJSON = github.toJSON();
      expect(github.id).toBe(GithubJSON.id);
    });
  });
});
