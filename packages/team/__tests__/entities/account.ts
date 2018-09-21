import { Account } from "../../lib/entities/account";

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

    it("#new", () => {
      const accountName = "teitei-tk";
      const account = Account.new(accountName);

      expect(account.name).toBe(accountName);
      expect(account.accounts.length).toBe(0);
    });

    it("#generateUUID", () => {
      const firstID = Account.generateUUID();
      const secondID = Account.generateUUID();

      expect(firstID).not.toBe(secondID);
    });
  });
});
