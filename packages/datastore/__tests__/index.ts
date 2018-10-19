import { IDataStore } from "./../lib";

describe("@juiz/datastore", () => {
  it("DataStore is interface", () => {
    class TestStore implements IDataStore {}
    expect(TestStore).not.toBe(null);
  });
});
