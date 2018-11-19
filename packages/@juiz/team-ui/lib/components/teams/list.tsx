import * as React from "react";
import * as ReactRouterDOM from "react-router-dom";

import { TeamJSON } from "@juiz/team";

import { H2, H5, Card, Elevation } from "@blueprintjs/core";

import { IAllTeamsResponse } from "./../../interfaces/response";
import { APIClient } from "../apiClient";

export interface ITeamProps extends TeamJSON {}

export const Team = (props: ITeamProps) => {
  return (
    <Card interactive={false} elevation={Elevation.TWO}>
      <H5>
        <ReactRouterDOM.Link to={`/team/edit/${props.id}`}>
          {props.name}
        </ReactRouterDOM.Link>
      </H5>
    </Card>
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
        <H2>Team List</H2>
        {this.state.teams.map(r => (
          <Team {...r} />
        ))}
      </div>
    );
  }
}
