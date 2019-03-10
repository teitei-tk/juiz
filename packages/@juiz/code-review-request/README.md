# juiz/code-review-request

## Dependency
* [octokit/graphql.js](https://github.com/octokit/graphql.js)

## Usage

```typescript
import { PullRequestSearch } from "@juiz/code-review-request";

(async() => {
  const service = new PullRequestSearch({
    token: "token"
  });

  const result = await service.fetch(
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
    }`, {
      owner: "octokit",
      repo: "octokit.rb",    // watch repo
      last: 50,
      labels: ["v5 release"] // PullRequest label to review
    }
  );

  console.log(result);
  // { repository: { pullRequests: { edges: [Array] } } }

  console.log(result.repository.pullRequests.edges);
  /*
    [
      { node: { title: 'Update docs to indicate Ruby < 2.2 not supported' } },
      { node: { title: 'Change the default value of `update_ref` `force` to false' } }
    ]
  */
})();
```
