import { Services, ServiceJSON, ServiceAccount } from "./..";

export class GitHub extends ServiceAccount {
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

  public toJSON(): ServiceJSON {
    return {
      id: this.id,
      name: this.name,
      displayName: this.displayName,
      service: Services.GitHub
    };
  }
}
