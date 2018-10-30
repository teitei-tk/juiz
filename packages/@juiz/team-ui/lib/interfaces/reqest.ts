import { AccountName, ServiceAccountName } from "@juiz/team";

export interface IAccountRegisterPayload {
  accountName: AccountName;
  githubName: ServiceAccountName;
  slackName: ServiceAccountName;
}
