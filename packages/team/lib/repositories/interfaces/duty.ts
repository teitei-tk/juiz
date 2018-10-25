import { Duty, DutyID } from "./../../entities/duty";
import { IRepository } from ".";

export interface IDutyRepository extends IRepository<Duty, DutyID> {}
