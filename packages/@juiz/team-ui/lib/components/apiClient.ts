import * as Axios from "axios";

export const defaultBaseURL =
  "http://localhost:3000" || process.env["JUIZ_UI_BASE_URL"];

export const APIClient = Axios.default.create({
  baseURL: defaultBaseURL
});
