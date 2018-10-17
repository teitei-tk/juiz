import { IRead } from "./read";
import { IWrite } from "./write";

export interface Repository<T> extends IRead<T>, IWrite<T> {}
