import { DataStore } from "./../lib";

describe("@juiz/datastore", () => {
  it("DataStore is interface", () => {
    class TestStore implements DataStore {}
    expect(TestStore).not.toBe(null);
  });
});
