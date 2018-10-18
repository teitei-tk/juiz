# juiz/github package

[![npm (scoped)](https://img.shields.io/npm/v/@juiz/github.svg?flat-square)](https://www.npmjs.com/package/@juiz/github)

Gihutb API Clients

# How to

for rest client(v3 api)

```typescript
import { RestClient } from "@teitei-tk/juiz-github/clients";

const client = new RestClient({
  token: your_github_token
});

// create new pull request
// eg.
// url: https://github.com/teitei-tk/juiz/number
// title: new-feature
// base:master head:develop
client.createPullRequest({
  owner: "teitei-tk",
  repo: "juiz",
  title: "new-feature",
  head: "develop",
  base: "master"
});
```

for GraphQLClient(v4 api)

```typescript
import { GraphQLClient } from "@teitei-tk/juiz-github/clients";

const client = new GraphQLClient({
  token: your_github_token
});

const result = await client.request(`{
  repository(owner: "teitei-tk", name: "juiz") {
    name
    owner {
      login
    }
    description
  }
}`);

console.log(result);
/*
{
  "data": {
    "repository": {
      "name": "juiz",
      "owner": {
        "login": "teitei-tk"
      },
      "description": "Manage Github PullRequest Code reviewer assign"
    }
  }
}
*/
```
