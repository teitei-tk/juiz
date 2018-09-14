import * as sinon from "sinon";
import { RestClient } from "../../lib/clients";

const pullRequestResponse = require("./../fixture/pull_request_response.json");

describe("github.clients.rest", () => {
  describe("#createPullRequest", () => {
    const baseURL = "https://authentication-test-host.com";
    const token = "aaa";

    let client: RestClient;
    let stub: sinon.SinonStub;

    beforeEach(() => {
      const params = {
        baseURL: baseURL,
        token: token
      };

      client = new RestClient(params);
      stub = sinon.stub(client, "createPullRequest").returns(
        Promise.resolve({
          data: pullRequestResponse
        })
      );
    });

    afterEach(() => {
      stub.restore();
    });

    it("create pull request", () => {
      const r = client.createPullRequest({
        owner: "teitei-tk",
        repo: "juiz",
        title: "new-feature",
        head: "develop",
        base: "master"
      });

      r.then(r => {
        expect(r.data.title).toBe("new-feature");
        expect(r.data.state).toBe("open");
        expect(r.data.head.repo.name).toBe("juiz");
      }).catch(err => {
        console.log(err);
      });
    });
  });
});
