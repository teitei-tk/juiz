import { Read } from "./read";
import { Write } from "./write";

import { IDataStore } from "@juiz/datastore";

export interface Repository<T> extends Read<T>, Write<T> {
  context: IDataStore;
}
