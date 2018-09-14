import nock = require("nock");
import { RestClient } from "../../lib/clients";

const pullRequestResponse = require("./../fixture/pull_request_response.json");

describe("github.clients.rest", () => {
  describe("#createPullRequest", () => {
    const baseURL = "https://authentication-test-host.com";
    const token = "aaa";

    let client: RestClient;

    beforeEach(() => {
      const params = {
        baseURL: baseURL,
        token: token
      };

      client = new RestClient(params);
      console.log(client);
    });

    it("create pull request", () => {
      nock(baseURL, {
        reqheaders: {
          authorization: `token ${token}`
        }
      })
        .post("/repos/teitei-tk/juiz/pulls")
        .reply(201, pullRequestResponse);

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
