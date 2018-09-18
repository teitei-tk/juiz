import Octkit = require("@octokit/rest");

import { GithubToken, APIClientInterface } from ".";

export interface RestClientOption extends Octkit.Options {
  token: GithubToken;
}

export interface PullRequestParams extends Octkit.PullRequestsCreateParams {}

export class RestClient implements APIClientInterface {
  client: Octkit;

  constructor(options: RestClientOption) {
    this.client = new Octkit(options);

    this.authenticate(options.token);
  }

  authenticate(token: GithubToken) {
    return this.client.authenticate({
      type: "token",
      token: token
    });
  }

  request(): Promise<Octkit> {
    return Promise.resolve(this.client);
  }

  async createPullRequest(params: PullRequestParams) {
    const client = await this.request();
    return await client.pullRequests.create(params);
  }
}
