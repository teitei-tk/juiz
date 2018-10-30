import * as Axios from "axios";
import Octkit = require("@octokit/rest");

export type GithubToken = string;

export interface APIClientInterface {
  client: Axios.AxiosInstance | Octkit;
}
