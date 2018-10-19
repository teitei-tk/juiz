import { JSONClient } from "../lib";

describe("datastore.json", () => {
  let client: JSONClient;

  beforeEach(() => {
    client = new JSONClient("/tmp/foo");
  });

  afterEach(() => {
    client.delete();
  });

  it("#constructor", () => {
    expect(client.exists()).toBe(true);
  });

  it("put and get", () => {
    client.put({
      foo: "bar"
    });

    const json = client.get<{
      foo: string;
    }>();

    expect(json.foo).toBe("bar");
  });
});
