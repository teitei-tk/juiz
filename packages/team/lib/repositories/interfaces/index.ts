import { IRead } from "./read";
import { IWrite } from "./write";

import { IDataStore } from "@juiz/datastore";

export interface Repository<T, K> extends IRead<T, K>, IWrite<T> {
  context: IDataStore;

  new (context: IDataStore): Repository<T, K>;
}
