import {
  Services,
  ServiceAccount,
  ServiceJSON,
  ServiceAccountName
} from "./..";

export class GitHub extends ServiceAccount {
  public readonly name: ServiceAccountName;
  public readonly displayName: ServiceAccountName;
  public readonly service: Services.GitHub;

  public constructor(value: ServiceJSON) {
    super();

    this.id = value.id;
    this.name = value.name;
    this.displayName = value.displayName;
    if (!value.displayName) {
      this.displayName = value.name;
    }

    this.service = Services.GitHub;
  }

  public static fromJSON(value: ServiceJSON): GitHub {
    return new GitHub(value);
  }

  public fromJSON(json: ServiceJSON): GitHub {
    return GitHub.fromJSON(json);
  }

  public toJSON(): ServiceJSON {
    return {
      id: this.id,
      name: this.name,
      displayName: this.displayName,
      service: Services.GitHub
    };
  }

  public static new(name: ServiceAccountName): GitHub {
    return new GitHub({
      id: GitHub.generateUUID(),
      name,
      service: Services.GitHub
    });
  }
}
