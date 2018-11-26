# juiz/dataStore-google-apps-sheets

## Require Environment Variables

TODO: OAuth2 ClientID and JSON Download flow

- https://console.developers.google.com/flows/enableapi?apiid=sheets.googleapis.com
- https://developers.google.com/sheets/api/guides/authorizing#APIKey

## Usage

```typescript
import {
  newOAuthClient,
  GoogleAppsParamsFromEnv,
  SpreadSheet,
  getAccessTokenCredentials
} from "@juiz/datastore-google-apps-sheets";

// example sheet. https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit#gid=0
const auth = newOAuthClient(GoogleAppsParamsFromEnv);
const client = new SpreadSheet({
  oauthClient: auth,
  credential: getAccessTokenCredentials(),
  spreadsheetID: "1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms"
});

const result = await client.fetch({
  range: "Class Data!A2:E"
});

console.log(result.data.values);
/*
 * [
 *    [ 'Alexandra', 'Female', '4. Senior', 'CA', 'English' ],
 *    [ 'Andrew', 'Male', '1. Freshman', 'SD', 'Math' ],
 *    [ 'Anna', 'Female', '1. Freshman', 'NC', 'English' ],
 *    [ 'Becky', 'Female', '2. Sophomore', 'SD', 'Art' ],
 *    [ 'Benjamin', 'Male', '4. Senior', 'WI', 'English' ],
 *    [ 'Carl', 'Male', '3. Junior', 'MD', 'Art' ],
 *    [ 'Carrie', 'Female', '3. Junior', 'NE', 'English' ],
 *    [ 'Dorothy', 'Female', '4. Senior', 'MD', 'Math' ],
 *    [ 'Dylan', 'Male', '1. Freshman', 'MA', 'Math' ],
 *    [ 'Edward', 'Male', '3. Junior', 'FL', 'English' ],
 *    [ 'Ellen', 'Female', '1. Freshman', 'WI', 'Physics' ],
 *    [ 'Fiona', 'Female', '1. Freshman', 'MA', 'Art' ],
 *    [ 'John', 'Male', '3. Junior', 'CA', 'Physics' ],
 *    [ 'Jonathan', 'Male', '2. Sophomore', 'SC', 'Math' ],
 *    [ 'Joseph', 'Male', '1. Freshman', 'AK', 'English' ],
 *    [ 'Josephine', 'Female', '1. Freshman', 'NY', 'Math' ],
 *    [ 'Karen', 'Female', '2. Sophomore', 'NH', 'English' ],
 *    [ 'Kevin', 'Male', '2. Sophomore', 'NE', 'Physics' ],
 *    [ 'Lisa', 'Female', '3. Junior', 'SC', 'Art' ],
 *    [ 'Mary', 'Female', '2. Sophomore', 'AK', 'Physics' ],
 *    [ 'Maureen', 'Female', '1. Freshman', 'CA', 'Physics' ],
 *    [ 'Nick', 'Male', '4. Senior', 'NY', 'Art' ],
 *    [ 'Olivia', 'Female', '4. Senior', 'NC', 'Physics' ],
 *    [ 'Pamela', 'Female', '3. Junior', 'RI', 'Math' ],
 *    [ 'Patrick', 'Male', '1. Freshman', 'NY', 'Art' ],
 *    [ 'Robert', 'Male', '1. Freshman', 'CA', 'English' ],
 *    [ 'Sean', 'Male', '1. Freshman', 'NH', 'Physics' ],
 *    [ 'Stacy', 'Female', '1. Freshman', 'NY', 'Math' ],
 *    [ 'Thomas', 'Male', '2. Sophomore', 'RI', 'Art' ],
 *    [ 'Will', 'Male', '4. Senior', 'FL', 'Math' ]
 * ]
 *
 *
 */
```

### Variables

- JUIZ_GOOGLE_APPS_CLIENT_TOKEN
- JUIZ_GOOGLE_APPS_CLIENT_ID
- JUIZ_GOOGLE_APPS_REDIRECT_URL
