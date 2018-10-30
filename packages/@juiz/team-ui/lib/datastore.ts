import { JSONClient } from "@juiz/datastore";

export const newDataStoreClient = (fileName: string) => {
  return new JSONClient("./db", fileName);
};
