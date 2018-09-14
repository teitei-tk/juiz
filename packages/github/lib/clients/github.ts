import * as Axios from "axios";
import Octkit = require("@octokit/rest");

export type GithubToken = string;

export interface AuthenticateOption {
  token: GithubToken;
}

export interface GithubOption extends Octkit.Options {
  token: GithubToken;
}

export interface PullRequestParams extends Octkit.PullRequestsCreateParams {}

export class RestClient {
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

export class GraphQLClient {
  client: Axios.AxiosInstance;

  constructor(token: GithubToken) {
    this.client = Axios.default.create({
      baseURL: "https://api.github.com/",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`
      }
    });
  }
}
