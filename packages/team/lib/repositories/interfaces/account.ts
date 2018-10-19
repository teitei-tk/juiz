import { Account, AccountID } from "./../../entities/account";
import { IRepository } from ".";

export interface IAccountRepository extends IRepository<Account, AccountID> {}
