import { IRead } from "./read";
import { IWrite } from "./write";

import { IDataStore } from "@juiz/datastore";

export interface IRepository<T, K> extends IRead<T, K>, IWrite<T> {
  context: IDataStore;
}
