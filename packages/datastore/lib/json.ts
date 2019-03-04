import * as path from "path";
import * as fs from "fs";

import { DataStore } from ".";

export type filePath = string;
export type fileName = string;

export const defaultJSONFileName = "json_client.json";

export class JSONClient implements DataStore {
  protected readonly jsonPath: filePath;

  public constructor(jsonPath: filePath, jsonName?: fileName) {
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

  public generateJSONFile() {
    // mkdir -p jsonPath
    fs.mkdirSync(path.dirname(this.jsonPath), { recursive: true });
    this.create({});
  }

  public exists() {
    fs.accessSync(this.jsonPath, fs.constants.R_OK | fs.constants.W_OK);
    return true;
  }

  public create(data: object) {
    fs.writeFileSync(this.jsonPath, JSON.stringify(data));
  }

  public get<T>(): T {
    const readJson = fs.readFileSync(this.jsonPath);
    return JSON.parse(readJson.toString());
  }

  public put(data: object) {
    this.delete();
    this.create(data);
  }

  public delete() {
    fs.unlinkSync(this.jsonPath);
  }
}
