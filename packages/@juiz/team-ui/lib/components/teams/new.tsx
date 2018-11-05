import * as React from "react";

import {
  FormGroup,
  H3,
  InputGroup,
  Button,
  Position,
  Toaster
} from "@blueprintjs/core";

import { APIClient } from "./..";
import { ITeamRegisterPayload } from "../../interfaces";

interface ITeamNewFormGroupState {}
interface ITeamNewFormProps {}

export const TeamAccounts = () => {};

export const TeamFormToaster = Toaster.create({
  className: "team-toaster",
  position: Position.TOP
});

export class TeamFormGroup extends React.PureComponent<
  ITeamNewFormProps,
  ITeamNewFormGroupState
> {
  public state = {};

  protected submitNewTeamForm = () => {
    const teamNameNode = document.querySelector(
      "#team-input"
    ) as HTMLInputElement;

    const teamName = teamNameNode.value;
    if (!teamName) {
      return TeamFormToaster.show({
        message: "required field is not input",
        timeout: 2500
      });
    }
    TeamFormToaster.clear();

    const payload: ITeamRegisterPayload = {
      teamName
    };

    const result = APIClient.post("/team/new", payload);
    result
      .then(r => {
        TeamFormToaster.show({
          message: "team register success"
        });
      })
      .catch(r => {
        TeamFormToaster.show({
          message: "team register failed"
        });
      });
  };

  public render() {
    return (
      <div className={"new-team"}>
        <H3>New Team form</H3>

        <FormGroup
          label="Team Name"
          labelFor="team-input"
          labelInfo="(required"
        >
          <InputGroup id="team-input" placeholder="new team name" />
        </FormGroup>

        <Button icon="refresh" onClick={this.submitNewTeamForm} text="submit" />
      </div>
    );
  }
}
