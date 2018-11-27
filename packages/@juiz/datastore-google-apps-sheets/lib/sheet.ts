import { IDataStore } from "@juiz/datastore";
import { google, sheets_v4 } from "googleapis";

import * as DataStoreGoogleSheets from ".";

export type SpreadSheetID = string;
export type SheetClient = sheets_v4.Sheets;

export type ValueRenderOption =
  | "FORMATTED_VALUE"
  | "UNFORMATTED_VALUE"
  | "FORMULA";

export class SpreadSheet implements IDataStore {
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

  fetch(query: {
    range: string;
    majorDimension?: string;
    valueRenderOption?: ValueRenderOption;
  }) {
    const payload = {
      majorDimension: "ROWS",
      valueRenderOption: "UNFORMATTED_VALUE",
      ...query
    };

    return this.spreadSheetClient.spreadsheets.values.get({
      majorDimension: payload.majorDimension,
      range: payload.range,
      auth: this.oauthClient,
      spreadsheetId: this.spreadSheetID,
      valueRenderOption: payload.valueRenderOption
    });
  }

  update(query: {
    payload: Array<{
      range: string;
      values: Array<Array<unknown>>;
      majorDimension?: string;
    }>;
    valueInputOption?: string;
  }) {
    const requestQuery = {
      valueInputOption: "USER_ENTERED",
      ...query
    };

    const requestBodyData: Array<
      sheets_v4.Schema$ValueRange
    > = requestQuery.payload.map(value => {
      return {
        majorDimension: "ROWS",
        ...value
      };
    });

    return this.spreadSheetClient.spreadsheets.values.batchUpdate({
      auth: this.oauthClient,
      spreadsheetId: this.spreadSheetID,
      requestBody: {
        valueInputOption: requestQuery.valueInputOption,
        data: requestBodyData
      }
    });
  }
}
