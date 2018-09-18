import * as Axios from "axios";

import { GithubToken, APIClientInterface } from ".";
import { GraphQLError, ExecutionResult } from "graphql";

export type ContentType = string;
export type AcceptHeader = string;
export type GraphQLEndPoint = string;
export type GraphQLRequestSchema = string;

// @link https://github.com/graphql/graphql-js/tree/84d05fc5c288f2c20df20cf7f60ee356fa6a2cdb/src/validation
// @link https://github.com/octokit/graphql-schema/blob/e5eb4ac2aa3624a7cc14c5ee5e6bffcabd14cc01/lib/validate.js
const { validate } = require("@octokit/graphql-schema");

export const schemaValidator = (
  schema: GraphQLRequestSchema
): ReadonlyArray<GraphQLError> => {
  return validate(schema);
};

export interface GraphQLHeader {
  "Content-Type": ContentType;
  Accept: AcceptHeader;
}

export interface GraphQLClientOption {
  token: GithubToken;
  baseURL?: GraphQLEndPoint;
  headers?: GraphQLHeader;
}

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
  return Object.assign(opt, defaultClientOption);
};

export class GraphQLClient implements APIClientInterface {
  client: Axios.AxiosInstance;

  constructor(options: GraphQLClientOption) {
    const opt = mergeDefaultOption(options);

    const headers = Object.assign(opt.headers, {
      Authorization: `Bearer ${opt.token}`
    });

    this.client = Axios.default.create({
      baseURL: opt.baseURL,
      headers: headers
    });
  }

  request(requestSchema: GraphQLRequestSchema): Promise<ExecutionResult> {
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
