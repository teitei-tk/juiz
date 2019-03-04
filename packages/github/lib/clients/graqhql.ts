import * as Axios from "axios";
import { GraphQLError, ExecutionResult } from "graphql";

// @link https://github.com/graphql/graphql-js/tree/84d05fc5c288f2c20df20cf7f60ee356fa6a2cdb/src/validation
// @link https://github.com/octokit/graphql-schema/blob/e5eb4ac2aa3624a7cc14c5ee5e6bffcabd14cc01/lib/validate.js
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { validate } = require("@octokit/graphql-schema");

import { GithubToken, APIClientInterface } from ".";

export type ContentType = string;
export type AcceptHeader = string;
export type GraphQLEndPoint = string;
export type GraphQLRequestSchema = string;

export interface GraphQLHeader {
  "Content-Type": ContentType;
  Accept: AcceptHeader;
}

export interface GraphQLClientOption {
  token: GithubToken;
  baseURL?: GraphQLEndPoint;
  headers?: GraphQLHeader;
}

export const schemaValidator = (
  schema: GraphQLRequestSchema
): ReadonlyArray<GraphQLError> => {
  return validate(schema);
};

export const defaultClientOption = {
  baseURL: "https://api.github.com",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json"
  }
};

export const mergeDefaultOption = (
  opt: GraphQLClientOption
): GraphQLClientOption => {
  return {
    ...opt,
    ...defaultClientOption
  };
};

export class GraphQLClient implements APIClientInterface {
  public client: Axios.AxiosInstance;

  public constructor(options: GraphQLClientOption) {
    const opt = mergeDefaultOption(options);

    const headers = {
      ...opt.headers,
      ...{ Authorization: `Bearer ${opt.token}` }
    };

    this.client = Axios.default.create({
      baseURL: opt.baseURL,
      headers: headers
    });
  }

  public request(
    requestSchema: GraphQLRequestSchema
  ): Promise<ExecutionResult> {
    const validated = schemaValidator(requestSchema);
    if (validated.length > 0) {
      return Promise.resolve({
        data: null,
        errors: validated
      });
    }

    return this.client.post("graphql", { query: requestSchema });
  }
}
