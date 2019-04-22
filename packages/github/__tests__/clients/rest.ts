import * as sinon from "sinon";
import Octkit = require("@octokit/rest");

import { RestClient } from "../../lib/clients";
const pullRequestResponse: Octkit.Response<
  Octkit.PullRequestsCreateResponse
> = require("./../fixture/pull_request_response.json");

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
      const ret = Promise.resolve(pullRequestResponse);
      stub = sinon.stub(client, "createPullRequest").returns(ret);
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
