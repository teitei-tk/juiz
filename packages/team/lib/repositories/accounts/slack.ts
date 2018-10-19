import { ServiceAccountID } from "./../../entities";
import { Slack } from "./../../entities/accounts/slack";
import { Repository } from "../interfaces";

export interface SlackRepository extends Repository<Slack, ServiceAccountID> {}
