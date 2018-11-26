import { google, sheets_v4 } from "googleapis";
import * as DataStoreGoogleSheets from ".";

export type SpreadSheetID = string;
export type SheetClient = sheets_v4.Sheets;

export class SpreadSheet {
  private readonly oauthClient: DataStoreGoogleSheets.OAuthClient;
  private readonly spreadSheetID: SpreadSheetID;

  readonly spreadSheetClient: SheetClient;

  constructor(value: {
    oauthClient: DataStoreGoogleSheets.OAuthClient;
    credential: DataStoreGoogleSheets.IAccessTokenCredentials;
    spreadsheetID: SpreadSheetID;
  }) {
    this.oauthClient = value.oauthClient;
    this.oauthClient.credentials = value.credential;

    this.spreadSheetID = value.spreadsheetID;
    this.spreadSheetClient = google.sheets("v4");
  }

  fetch(query: { range: string }) {
    return this.spreadSheetClient.spreadsheets.values.get({
      range: query.range,
      auth: this.oauthClient,
      spreadsheetId: this.spreadSheetID
    });
  }
}
