//import { PullRequestSearch } from "./../lib";

interface PullRequestResult {
  repository: {
    pullRequests: {
      edges: {
        title: string;
        url: string;
      }[];
    };
  };
}

describe("@juiz/code-review-request", () => {
  it("code-review-request exists", async () => {
    expect(true).toBe(true);

    /*
    const service = new PullRequestSearch({
      token: "token"
    });

    const result = await service.fetch<PullRequestResult>(
      `query pullRequests($owner: String!, $repo: String!, $last: Int = 3, $labels: [String!]) {
        repository(owner: $owner, name: $repo) {
          pullRequests(last: $last, labels: $labels) {
            edges {
              node {
                url
                title
              }
            }
          }
        }
      }`,
      {
        owner: "octokit",
        repo: "octokit.rb",
        last: 50,
        labels: ["v5 release"]
      }
    );

    console.log(result);
    console.log(result.repository.pullRequests.edges);
    */
  });
});
