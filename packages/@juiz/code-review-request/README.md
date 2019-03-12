# juiz/code-review-request

## Dependency

- [octokit/graphql.js](https://github.com/octokit/graphql.js)

## Usage

```typescript
import { PullRequestSearch } from "@juiz/code-review-request";

interface PullRequestResult {
  repository: {
    pullRequests: {
      edges: {
        url: string;
        title: string;
      }[];
    };
  };
}

(async () => {
  const service = new PullRequestSearch({
    token: "token"
  });

  const result = await service.fetch<PullRequestResult>(
    `query pullRequests($owner: String!, $repo: String!, $last: Int = 50, $labels: [String!]) {
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
      repo: "octokit.rb", // watch repo
      last: 50,
      labels: ["v5 release"] // PullRequest label to review
    }
  );

  console.log(result);
  // { repository: { pullRequests: { edges: [Array] } } }

  console.log(result.repository.pullRequests.edges);
  /*
    [
      {
        node: {
          url: 'https://github.com/octokit/octokit.rb/pull/948',
          title: 'Update docs to indicate Ruby < 2.2 not supported'
        }
      },
      {
        node: {
          url: 'https://github.com/octokit/octokit.rb/pull/980',
          title: 'Change the default value of `update_ref` `force` to false'
        }
      }
    ]
  */
})();
```
