import { Github, Services } from "../../../lib/entities/accounts";

describe("team.entities.accounts.Github", () => {
  describe("Github", () => {
    it("#constructor", () => {
      const id = "aaa";
      const name = "teitei_tk";

      const github = new Github({
        id: id,
        name: name,
        service: Services.Github
      });

      expect(github.id).toBe(id);
      expect(github.name).toBe(name);
      expect(github.service).toBe(Services.Github);
    });

    it("#fromJSON", () => {
      const github = Github.fromJSON({
        id: "aaa",
        name: "teitei_tk",
        service: Services.Github
      });

      expect(github.service).toBe(Services.Github);
    });

    it("#toJSON", () => {
      const github = new Github({
        id: "aaa",
        name: "teitei_tk",
        service: Services.Github
      });

      const GithubJSON = github.toJSON();
      expect(github.id).toBe(GithubJSON.id);
    });
  });
});
