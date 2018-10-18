import { IRead } from "./read";
import { IWrite } from "./write";

import { IDataStore } from "@juiz/datastore";

export interface Repository<T> extends IRead<T>, IWrite<T> {
  new (context: IDataStore): Repository<T>;
}
