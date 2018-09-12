import Octkit = require("@octokit/rest");

export type GithubToken = string;

export interface AuthenticateOption {
  token: GithubToken;
}

export interface GithubOption extends Octkit.Options {
  token: GithubToken;
}

export interface PullRequestParams extends Octkit.PullRequestsCreateParams {}

export class Client {
  private github: Octkit;

  constructor(options: GithubOption) {
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
