import { AccountName, ServiceAccountName, TeamName } from "@juiz/team";

export interface IAccountRegisterPayload {
  accountName: AccountName;
  githubName: ServiceAccountName;
  slackName: ServiceAccountName;
}

export interface ITeamRegisterPayload {
  teamName: TeamName;
}
