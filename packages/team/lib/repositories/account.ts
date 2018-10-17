import { Account, AccountID } from "./../entities/account";
import { Repository } from "./interfaces";

export class AccountRepository implements Repository<Account> {
  public find<AccountID>(id: AccountID): Promise<{ entity: Account }> {
    throw new Error("not implemented");
  }

  public findAll<AccountID>(
    ids: Array<AccountID>
  ): Promise<{ entities: Array<Account> }> {
    throw new Error("not implemented");
  }

  public create(entity: Account): Promise<{ entity: Account }> {
    throw new Error("not implemented");
  }

  public update(entity: Account): Promise<{ entity: Account }> {
    throw new Error("not implemented");
  }

  public delete(entity: Account): Promise<{ entity: Account }> {
    throw new Error("not implemented");
  }
}
