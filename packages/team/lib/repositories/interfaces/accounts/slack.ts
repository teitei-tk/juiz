import { ServiceAccountID } from "./../../../entities";
import { Slack } from "./../../../entities/accounts/slack";
import { IRepository } from "..";

export interface ISlackRepository
  extends IRepository<Slack, ServiceAccountID> {}
