import * as fs from "fs";
import * as path from "path";
import * as readline from "readline";

import * as Auth from "./auth";

export interface IAccessTokenCredentials {
  access_token: string;
  refresh_token: string;
  scope: string;
  token_type: string;
  expiry_date: number;
}

export const APPLICATION_SCOPES = [
  "https://www.googleapis.com/auth/spreadsheets"
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

export const tokenStoreReadlineInterface = (
  params: Auth.IGoogleAuthClientParams
) => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  const oauth2Client = Auth.newOAuthClient(params);

  const authUrl = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: APPLICATION_SCOPES
  });

  console.log(
    `fetch Google SpreadSheet App token. please access this url : ${authUrl}`
  );

  rl.question(
    "Please enter the code displayed on the authorized website. : ",
    code => {
      rl.close();

      oauth2Client.getToken(code, (err, token) => {
        if (err) {
          console.error(
            `Error while trying to retrieve access token. error message : ${err}`
          );
          return 1;
        }

        oauth2Client.credentials = token;

        try {
          fs.mkdirSync(ACCESS_TOKEN_DIR);
        } catch (err) {
          if (err.code != "EEXIST") {
            throw err;
          }
        }

        fs.unlinkSync(ACCESS_TOKEN_FILE_PATH);
        fs.writeFileSync(ACCESS_TOKEN_FILE_PATH, JSON.stringify(token));
        console.log(`Token stored to ${ACCESS_TOKEN_FILE_PATH}`);

        return 0;
      });
    }
  );
};
