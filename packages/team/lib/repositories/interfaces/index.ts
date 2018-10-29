import { IRead } from "./read";
import { IWrite } from "./write";

import { IDataStore } from "@juiz/datastore";

export interface IRepository<T> extends IRead<T>, IWrite<T> {
  context: IDataStore;
}
