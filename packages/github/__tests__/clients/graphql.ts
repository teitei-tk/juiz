import * as sinon from "sinon";
import { GraphQLClient } from "../../lib/clients";

const exampleResponse = require("./../fixture/graphql_example_response.json");

describe("github.clients.graphql", () => {
  describe("#request", () => {
    const token = "aaa";

    let client: GraphQLClient;
    let stub: sinon.SinonStub;

    beforeEach(() => {
      client = new GraphQLClient(token);
      stub = sinon
        .stub(client, "request")
        .returns(Promise.resolve(exampleResponse));
    });

    afterEach(() => {
      stub.restore();
    });

    // @see https://developer.github.com/v4/explorer/
    it("request", async () => {
      const owner = "teitei-tk";
      const repository = "juiz";

      const result = (await client.request(
        `{
          repository(owner: "${owner}", name: "${repository}") {
            name
            owner {
              login
            }
          }
        }`
      )) as {
        data: {
          repository: {
            name: string;
            owner: { login: string };
          };
        };
      };

      expect(result.data.repository.name).toBe(repository);
      expect(result.data.repository.owner.login).toBe(owner);
    });
  });
});
