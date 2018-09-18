import * as Axios from "axios";
import Octkit = require("@octokit/rest");

import { RestClient } from "./rest";
import { GraphQLClient } from "./graqhql";

type GithubToken = string;

export interface APIClientInterface {
  client: Axios.AxiosInstance | Octkit;
}

export { RestClient, GraphQLClient, GithubToken };
