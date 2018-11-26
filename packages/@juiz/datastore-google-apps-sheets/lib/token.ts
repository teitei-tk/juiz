import * as fs from "fs";
import * as path from "path";

export interface IAccessTokenCredentials {
  access_token: string;
  refresh_token: string;
  scope: string;
  token_type: string;
  expiry_date: number;
}

export const APPLICATION_SCOPES = [
  "https://www.googleapis.com/auth/spreadsheets.readonly"
];
export const ACCESS_TOKEN_DIR = path.join(process.env["HOME"]);
export const ACCESS_TOKEN_FILE_NAME = ".juiz.sheets.googleapis.com.json";
export const ACCESS_TOKEN_FILE_PATH = path.join(
  ACCESS_TOKEN_DIR,
  ACCESS_TOKEN_FILE_NAME
);

export const getAccessTokenCredentials = (): IAccessTokenCredentials => {
  const sheetTokenCredential = fs
    .readFileSync(ACCESS_TOKEN_FILE_PATH)
    .toString();

  const accessTokenCredentials: IAccessTokenCredentials = JSON.parse(
    sheetTokenCredential
  );

  return accessTokenCredentials;
};
