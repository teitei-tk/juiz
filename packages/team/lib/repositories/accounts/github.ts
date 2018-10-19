import { ServiceAccountID } from "./../../entities";
import { Github } from "./../../entities/accounts/github";
import { Repository } from "../interfaces";

export interface GithubRepository
  extends Repository<Github, ServiceAccountID> {}
