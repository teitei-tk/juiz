import * as path from "path";
import * as fs from "fs";

import { IDataStore } from "./interface";

export type filePath = string;
export type fileName = string;

export const defaultJSONFileName = "json_client.json";

export class JSONClient implements IDataStore {
  readonly jsonPath: filePath;

  constructor(jsonPath: filePath, jsonName?: fileName) {
    if (!jsonName) {
      jsonName = defaultJSONFileName;
    }

    this.jsonPath = path.join(jsonPath, jsonName);
    try {
      this.exists();
    } catch (_) {
      this.generateJSONFile();
    }
  }

  generateJSONFile() {
    // mkdir -p jsonPath
    fs.mkdirSync(path.dirname(this.jsonPath), { recursive: true });
    this.create({});
  }

  exists() {
    fs.accessSync(this.jsonPath, fs.constants.R_OK | fs.constants.W_OK);
    return true;
  }

  create(data: object) {
    fs.writeFileSync(this.jsonPath, JSON.stringify(data));
  }

  get<T>(): T {
    const readJson = fs.readFileSync(this.jsonPath);
    return JSON.parse(readJson.toString());
  }

  put(data: object) {
    this.delete();
    this.create(data);
  }

  delete() {
    fs.unlinkSync(this.jsonPath);
  }
}
