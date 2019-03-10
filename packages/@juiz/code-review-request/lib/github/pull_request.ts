export type GraphQLClient = Function;
export type GraphQLClientToken = string;

const GraphQL = require("@octokit/graphql") as GraphQLClient;

export class PullRequestSearch {
  protected readonly client: GraphQLClient;
  protected readonly token: GraphQLClientToken;

  public constructor(arg: { token: GraphQLClientToken }) {
    this.client = GraphQL;
    this.token = arg.token;
  }

  /**
   * @see https://github.com/octokit/graphql.js/pull/3
   * @description
   * ⚠️ Do not use template literals in the query
   * strings as they make your code vulnerable to query injection attacks Use variables instead:
   *
   * @param query
   * @param options https://developer.github.com/v4/object/repository/
   */
  public async fetch(query: string, options?: object) {
    const requestOptions = {
      ...options,
      ...{
        headers: {
          authorization: `token ${this.token}`
        }
      }
    };

    return await this.client(query, requestOptions);
  }
}
