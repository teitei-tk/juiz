import { Team, TeamID } from "./../../entities/team";
import { IRepository } from ".";

export interface ITeamRepository extends IRepository<Team, TeamID> {}
