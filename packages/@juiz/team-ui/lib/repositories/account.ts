import { newDataStoreClient, Repository } from ".";

import { Account } from "@juiz/team";

export class AccountRepository extends Repository<Account> {
  constructor() {
    super();

    this.context = newDataStoreClient("account.json");
  }
}
