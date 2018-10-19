import { Team, TeamID } from "./../entities/team";
import { Repository } from "./interfaces";

export interface TeamRepository extends Repository<Team, TeamID> {}
