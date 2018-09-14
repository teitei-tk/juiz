import * as Axios from "axios";

import { GithubToken } from ".";

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
}
