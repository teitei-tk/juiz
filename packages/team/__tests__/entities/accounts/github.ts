import { Services, GitHub } from "../../../lib";

describe("team.entities.accounts.Github", () => {
  describe("Github", () => {
    it("#constructor", () => {
      const id = "aaa";
      const name = "teitei_tk";

      const github = new GitHub({
        id,
        name
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
        displayName: displayName
      });

      expect(github.name).toBe(name);
      expect(github.displayName).not.toBe(name);
      expect(github.displayName).not.toBe(github.name);
      expect(github.displayName).toBe(displayName);
    });

    it("#fromJSON", () => {
      const github = GitHub.fromJSON({
        id: "aaa",
        name: "teitei_tk"
      });

      expect(github.service).toBe(Services.GitHub);
    });

    it("#toJSON", () => {
      const github = new GitHub({
        id: "aaa",
        name: "teitei_tk"
      });

      const GithubJSON = github.toJSON();
      expect(github.id).toBe(GithubJSON.id);
    });
  });
});
