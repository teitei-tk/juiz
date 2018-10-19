import { ServiceAccountID } from "./../../../entities";
import { Github } from "./../../../entities/accounts/github";
import { IRepository } from "..";

export interface IGithubRepository
  extends IRepository<Github, ServiceAccountID> {}
