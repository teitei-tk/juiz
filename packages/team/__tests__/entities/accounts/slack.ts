import { Services } from "../../../lib/entities/service";
import { Slack } from "../../../lib/entities/accounts";

describe("team.entities.accounts.slack", () => {
  describe("Slack", () => {
    it("#constructor", () => {
      const id = "aaa";
      const name = "teitei_tk";

      const slack = new Slack({
        id: id,
        name: name,
        service: Services.Slack
      });

      expect(slack.id).toBe(id);
      expect(slack.name).toBe(name);
      expect(slack.displayName).toBe(name);
      expect(slack.service).toBe(Services.Slack);
    });

    it("displayName", () => {
      const name = "teitei_tk";
      const displayName = "teitei-tk";

      const slack = new Slack({
        id: "aaa",
        name: name,
        displayName: displayName,
        service: Services.Slack
      });

      expect(slack.name).toBe(name);
      expect(slack.displayName).not.toBe(name);
      expect(slack.displayName).not.toBe(slack.name);

      expect(slack.displayName).toBe(displayName);
    });

    it("#fromJSON", () => {
      const slack = Slack.fromJSON({
        id: "aaa",
        name: "teitei_tk",
        service: Services.Slack
      });

      expect(slack.service).toBe(Services.Slack);
    });

    it("#toJSON", () => {
      const slack = new Slack({
        id: "aaa",
        name: "teitei_tk",
        service: Services.Slack
      });

      const slackJSON = slack.toJSON();
      expect(slack.id).toBe(slackJSON.id);
    });
  });
});
