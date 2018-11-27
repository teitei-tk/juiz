import * as fs from "fs";
import * as readline from "readline";

import {
  APPLICATION_SCOPES,
  ACCESS_TOKEN_DIR,
  ACCESS_TOKEN_FILE_PATH
} from "../token";

import * as Auth from "./../auth";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const main = () => {
  if (!Auth.validateGoogleAppsParamsFromEnv()) {
    console.log("invalid environment variables, please look READEMD.md");
    return 1;
  }
  const oauth2Client = Auth.newOAuthClient(Auth.GoogleAppsParamsFromEnv);

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

        fs.writeFileSync(ACCESS_TOKEN_FILE_PATH, JSON.stringify(token));
        console.log(`Token stored to ${ACCESS_TOKEN_FILE_PATH}`);

        return 0;
      });
    }
  );
};

main();
