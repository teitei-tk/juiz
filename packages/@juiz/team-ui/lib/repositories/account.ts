import { newDataStoreClient, Repository } from ".";

import { Account, AccountJSON } from "@juiz/team";

export interface AccountJSON {
  accounts: Array<AccountJSON>;
}

export class AccountRepository extends Repository<Account> {
  setupDataStoreClient() {
    this.context = newDataStoreClient("account.json");
  }
}
