import * as React from "react";

import {
  FormGroup,
  H3,
  InputGroup,
  Button,
  Position,
  Toaster
} from "@blueprintjs/core";

import { APIClient } from "../apiClient";

interface ITeamNewFormGroupState {}
interface ITeamNewFormProps {}

export const TeamFormToaster = Toaster.create({
  className: "team-toaster",
  position: Position.TOP
});

export const TeamAccounts = () => {};

export class TeamFormGroup extends React.PureComponent<
  ITeamNewFormProps,
  ITeamNewFormGroupState
> {
  public state = {};

  protected submitNewTeamForm = () => {};

  componentDidMount() {
    console.log("component");
  }

  public render() {
    return (
      <div className={"new-team"}>
        <H3>New Team form</H3>

        <FormGroup
          label="Team Name"
          labelFor="team-input"
          labelInfo="(required"
        >
          <InputGroup id="team-input" placeholder="your name" />
        </FormGroup>

        <Button icon="refresh" onClick={this.submitNewTeamForm} text="submit" />
      </div>
    );
  }
}
