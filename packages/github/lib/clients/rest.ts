import Octkit = require("@octokit/rest");

import { GithubToken } from ".";

export interface RestClientOption extends Octkit.Options {
  token: GithubToken;
}

export interface PullRequestParams extends Octkit.PullRequestsCreateParams {}

export class RestClient {
  private github: Octkit;

  constructor(options: RestClientOption) {
    this.github = new Octkit(options);

    this.authenticate(options.token);
  }

  authenticate(token: GithubToken) {
    return this.github.authenticate({
      type: "token",
      token: token
    });
  }

  async createPullRequest(params: PullRequestParams) {
    return await this.github.pullRequests.create(params);
  }
}
