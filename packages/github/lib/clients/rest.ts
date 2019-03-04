import Octkit = require("@octokit/rest");

import { GithubToken, APIClientInterface } from ".";

export interface RestClientOption extends Octkit.Options {
  token: GithubToken;
}

export class RestClient implements APIClientInterface {
  public readonly client: Octkit;

  public constructor(options: RestClientOption) {
    this.client = new Octkit(options);

    this.authenticate(options.token);
  }

  protected authenticate(token: GithubToken) {
    return this.client.authenticate({
      type: "token",
      token: token
    });
  }

  public request(): Promise<Octkit> {
    return Promise.resolve(this.client);
  }

  public async createPullRequest(params: Octkit.PullRequestsCreateParams) {
    const client = await this.request();
    return await client.pullRequests.create(params);
  }
}
