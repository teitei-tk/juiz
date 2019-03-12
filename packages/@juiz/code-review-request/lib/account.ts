import { Account, Slack, GitHub } from "@juiz/team";

export type newAccounts = {
  type: "slack" | "github";
  name: string;
}[];

export const newAccount = (name: string, accounts: newAccounts): Account => {
  const account = Account.new(name);

  const slackVal = accounts.find(val => val.type == "slack");
  const slack = Slack.new(slackVal.name);
  account.appendServiceAccount(slack);

  const githubVal = accounts.find(val => val.type == "github");
  const github = GitHub.new(githubVal.name);
  account.appendServiceAccount(github);

  return account;
};
