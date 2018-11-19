import * as React from "react";

import { H2, Card } from "@blueprintjs/core";
import { TeamID, TeamJSON, AccountJSON } from "@juiz/team";

import { FormGroup, InputGroup, Classes, Intent } from "@blueprintjs/core";

import { APIClient } from "./../apiClient";
import { ITeamResponse } from "../../interfaces";

export interface ITeamEditProps {
  match: {
    params: {
      id: TeamID;
    };
  };
}
export interface ITeamEditState {
  teamID: TeamID | "";
  entity: TeamJSON;
}

export const Account = (props: AccountJSON) => {
  return <div>{props.name}</div>;
};

export class TeamEdit extends React.PureComponent<
  ITeamEditProps,
  ITeamEditState
> {
  constructor(props: ITeamEditProps) {
    super(props);

    this.state = {
      ...{},
      teamID: props.match.params.id,
      entity: {
        id: "",
        name: ""
      }
    };
  }

  async componentWillMount() {
    const response: ITeamResponse = (await APIClient.get("/team", {
      params: {
        id: this.state.teamID
      }
    })).data;

    const state = {
      ...this.state,
      entity: response.data
    };

    this.setState(state);
  }

  public render() {
    const { entity } = this.state;

    return (
      <div>
        <H2>Team Edit</H2>

        <FormGroup
          label="Team Name"
          labelFor="team-input"
          labelInfo="(required"
        >
          <InputGroup
            id="team-input"
            placeholder="new team name"
            intent={Intent.WARNING}
            defaultValue={entity.name}
          />
        </FormGroup>

        {entity.accounts.forEach(account => {
          return <Account {...account} />;
        })}
      </div>
    );
  }
}
