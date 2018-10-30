import { Account, Github, Slack } from "@juiz/team";

import { IAccountRegisterPayload } from "./../interfaces";
import { AccountRepository } from "./../repositories";

export class AccountService {
  protected accountRepo: AccountRepository;

  constructor() {
    this.accountRepo = new AccountRepository();
  }

  newAccount(value: IAccountRegisterPayload) {
    const slack = Slack.new(value.slackName);
    const github = Github.new(value.githubName);
    const account = Account.new(value.accountName);

    const newAccount = new Account(
      {
        id: account.id,
        name: account.name
      },
      [slack, github]
    );

    this.accountRepo.update(newAccount);
    return true;
  }
}
