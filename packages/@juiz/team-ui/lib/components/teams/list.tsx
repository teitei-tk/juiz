import * as React from "react";

import { TeamJSON } from "@juiz/team";

import { IAllTeamsResponse } from "./../../interfaces/response";
import { APIClient } from "../apiClient";

export interface ITeamProps extends TeamJSON {}

export const Team = (props: ITeamProps) => {
  return (
    <div>
      <span>{props.name}</span>
    </div>
  );
};

export interface ITeamListProps {}
export interface ITeamListState {
  teams: Array<TeamJSON>;
}

export class TeamList extends React.PureComponent<
  ITeamListProps,
  ITeamListState
> {
  constructor(props: ITeamListProps) {
    super(props);

    this.state = {
      teams: []
    };
  }

  async componentDidMount() {
    const result: IAllTeamsResponse = (await APIClient.get("/team/list")).data;

    this.setState({
      teams: result.data.entities
    });
  }

  public render() {
    return (
      <div>
        <p>List</p>
        {this.state.teams.map(r => {
          return <Team {...r} />;
        })}
      </div>
    );
  }
}
