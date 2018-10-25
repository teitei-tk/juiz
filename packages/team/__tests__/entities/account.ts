import { Account } from "../../lib/entities/account";
import { Services } from "../../lib/entities/service";

describe("team.entities.account", () => {
  describe("Account", () => {
    it("#constructor", () => {
      const id = Account.generateUUID();
      const name = "teitei-tk";

      const account = new Account({
        id: id,
        name: name
      });

      expect(account.name).toBe(name);
      expect(account.id).toBe(id);
      expect(account.id).not.toBe(Account.generateUUID());
    });

    it("#toJSON", () => {
      const json = {
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
            service: Services.Github
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
      const json = {
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

      const account = Account.fromJSON(json);
      expect(account.id).toBe(json.id);
      expect(account.name).toBe(json.name);
    });

    it("#findServiceAccount", () => {
      const json = {
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

      const account = Account.fromJSON(json);
      expect(account.id).toBe(json.id);
      expect(account.name).toBe(json.name);

      const github = account.findServiceAccount(Services.Github);
      expect(github.name).toBe("teitei-tk");

      const slack = account.findServiceAccount(Services.Slack);
      expect(slack.name).toBe("teitei_tk");
    });

    it("#new", () => {
      const accountName = "teitei-tk";
      const account = Account.new(accountName);

      expect(account.name).toBe(accountName);
      expect(account.serviceAccounts.length).toBe(0);
    });

    it("#generateUUID", () => {
      const firstID = Account.generateUUID();
      const secondID = Account.generateUUID();

      expect(firstID).not.toBe(secondID);
    });
  });
});
