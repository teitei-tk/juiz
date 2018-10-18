import { Account, AccountID } from "./../entities/account";
import { Repository } from "./interfaces";

export interface AccountRepository extends Repository<Account> {}
