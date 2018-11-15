import * as React from "react";

export interface ITeamEditProps {}
export interface ITeamEditState {}

export class TeamEdit extends React.PureComponent<
  ITeamEditProps,
  ITeamEditState
> {
  componentDidMount() {
    console.log("component did mount");
  }

  public render() {
    return (
      <div>
        <p>hello</p>
      </div>
    );
  }
}
