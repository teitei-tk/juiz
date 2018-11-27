import { OAuth2Client } from "google-auth-library";

export type OAuthClient = OAuth2Client;

export interface IGoogleAppsParams {
  secret: string;
  clientID: string;
  redirectURL: string;
}

export const GoogleAppsParamsFromEnv = {
  secret: process.env["JUIZ_GOOGLE_APPS_CLIENT_SECRET"],
  clientID: process.env["JUIZ_GOOGLE_APPS_CLIENT_ID"],
  redirectURL: process.env["JUIZ_GOOGLE_APPS_REDIRECT_URL"]
};

export const validateGoogleAppsParamsFromEnv = () => {
  return !Object.values(GoogleAppsParamsFromEnv).includes(undefined);
};

export const newOAuthClient = (clientArg: IGoogleAppsParams): OAuthClient => {
  return new OAuth2Client(
    clientArg.clientID,
    clientArg.secret,
    clientArg.redirectURL
  );
};
