import * as Axios from "axios";
export const { validate } = require("@octokit/graphql-schema");

import { GithubToken } from ".";
import { GraphQLError } from "graphql";
import { ExecutionResult } from "graphql";

// @link https://github.com/graphql/graphql-js/tree/84d05fc5c288f2c20df20cf7f60ee356fa6a2cdb/src/validation
export const schemaValidator = (
  schema: GraphQLRequestSchema
): ReadonlyArray<GraphQLError> => {
  return validate(schema);
};

export type ContentType = string;
export type AcceptHeader = string;
export type GraphQLEndPoint = string;

export interface GraphQLHeader {
  "Content-Type": ContentType;
  Accept: AcceptHeader;
}

export interface GraphQLClientOption {
  baseURL: GraphQLEndPoint;
  headers: GraphQLHeader;
}

export const defaultClientOption = {
  baseURL: "https://api.github.com",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json"
  }
};

export type GraphQLRequestSchema = string;

export const mergeDefaultOption = (
  opt: GraphQLClientOption
): GraphQLClientOption => {
  return Object.assign(opt, defaultClientOption);
};

export class GraphQLClient {
  client: Axios.AxiosInstance;

  constructor(token: GithubToken, options?: GraphQLClientOption) {
    const opt = mergeDefaultOption(options);

    const headers = Object.assign(opt.headers, {
      Authorization: `Bearer ${token}`
    });

    this.client = Axios.default.create({
      baseURL: opt.baseURL,
      headers: headers
    });
  }

  request(requestSchema: GraphQLRequestSchema): Promise<ExecutionResult> {
    const validated = schemaValidator(requestSchema);
    if (validated.length >= 0) {
      return Promise.resolve({
        data: null,
        errors: validated
      });
    }

    return this.client.post("graphql", { query: requestSchema });
  }
}
