import { IDataStore } from "@juiz/datastore";
import { google, sheets_v4 } from "googleapis";

import * as DataStoreGoogleSheets from ".";

export type SpreadSheetID = string;
export type SheetClient = sheets_v4.Sheets;

export type ValueRenderOption =
  | "FORMATTED_VALUE"
  | "UNFORMATTED_VALUE"
  | "FORMULA";

export type DateTimeRenderOption = "SERIAL_NUMBER" | "FORMATTED_STRING";

export type ValueInputOption =
  | "INPUT_VALUE_OPTION_UNSPECIFIED"
  | "RAW"
  | "USER_ENTERED";

export type Dimension = "DIMENSION_UNSPECIFIED" | "ROWS" | "COLUMNS";

export class SpreadSheet implements IDataStore {
  private readonly oauthClient: DataStoreGoogleSheets.OAuthClient;
  private readonly spreadSheetID: SpreadSheetID;

  public readonly spreadSheetClient: SheetClient;

  public constructor(value: {
    oauthClient: DataStoreGoogleSheets.OAuthClient;
    credential: DataStoreGoogleSheets.IAccessTokenCredentials;
    spreadsheetID: SpreadSheetID;
  }) {
    this.oauthClient = value.oauthClient;
    this.oauthClient.credentials = value.credential;

    this.spreadSheetID = value.spreadsheetID;
    this.spreadSheetClient = google.sheets("v4");
  }

  public fetch(query: {
    range: string;
    majorDimension?: Dimension;
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

  public update(query: {
    payload: {
      range: string;
      values: unknown[][];
      majorDimension?: Dimension;
    }[];
    options?: {
      valueInputOption?: ValueInputOption;
      responseDateTimeRenderOption?: DateTimeRenderOption;
      responseValueRenderOption?: ValueRenderOption;
      includeValuesInResponse?: boolean;
    };
  }) {
    const requestQuery = {
      valueInputOption: "USER_ENTERED",
      responseDateTimeRenderOption: "SERIAL_NUMBER",
      responseValueRenderOption: "FORMATTED_VALUE",
      includeValuesInResponse: true,
      ...query.options
    };

    const requestPayload: sheets_v4.Schema$ValueRange[] = query.payload.map(
      value => {
        return {
          majorDimension: "ROWS",
          ...value
        };
      }
    );

    return this.spreadSheetClient.spreadsheets.values.batchUpdate({
      auth: this.oauthClient,
      spreadsheetId: this.spreadSheetID,
      requestBody: {
        valueInputOption: requestQuery.valueInputOption,
        responseDateTimeRenderOption: requestQuery.responseDateTimeRenderOption,
        responseValueRenderOption: requestQuery.responseValueRenderOption,
        includeValuesInResponse: requestQuery.includeValuesInResponse,
        data: requestPayload
      }
    });
  }
}
