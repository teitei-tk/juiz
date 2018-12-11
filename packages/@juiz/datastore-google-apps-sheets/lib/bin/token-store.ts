#!/usr/bin/env node

import * as Token from "./../token";
import * as Auth from "./../auth";

Token.tokenStoreReadlineInterface(Auth.GoogleAppsParamsFromEnv);
