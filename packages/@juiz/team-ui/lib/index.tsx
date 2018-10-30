import * as React from "react";
import * as ReactDOM from "react-dom";
import * as Axios from "axios";

import {
  FormGroup,
  H3,
  InputGroup,
  Button,
  Position,
  Toaster
} from "@blueprintjs/core";

import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import "@blueprintjs/core/lib/css/blueprint.css";

import { IAccountRegisterPayload } from "./interfaces/request";

interface IAccountFormGroupState {}

interface IAccountFormProps {}

export const AccountFormToaster = Toaster.create({
  className: "account-toaster",
  position: Position.TOP
});

export const defaultBaseURL = "0.0.0.0:3000" || process.env["JUIZ_UI_BASE_URL"];

export const APIClient = Axios.default.create({
  baseURL: defaultBaseURL
});

export class AccountFormGroup extends React.PureComponent<
  IAccountFormProps,
  IAccountFormGroupState
> {
  public state = {};

  protected submitAccountForm = () => {
    const accountNameNode = document.querySelector(
      "#account-input"
    ) as HTMLInputElement;

    const githubNameNode = document.querySelector(
      "#github-input"
    ) as HTMLInputElement;

    const slackNameNode = document.querySelector(
      "#slack-input"
    ) as HTMLInputElement;

    const accountName = accountNameNode.value;
    const githubName = githubNameNode.value;
    const slackName = slackNameNode.value;

    const result = accountName && githubName && slackName;
    if (!result) {
      return AccountFormToaster.show({
        message: "required field is not input",
        timeout: 2500
      });
    }

    const payload: IAccountRegisterPayload = {
      accountName,
      githubName,
      slackName
    };

    APIClient.post("/account/new", payload)
      .then(r => {
        AccountFormToaster.show({
          message: "account register success"
        });
      })
      .catch(r => {
        AccountFormToaster.show({
          message: "account register failed"
        });
      });
  };

  public render() {
    return (
      <div className={"account-update"}>
        <H3>Account form</H3>

        <FormGroup
          label="Account Name"
          labelFor="account-input"
          labelInfo="(required"
        >
          <InputGroup id="account-input" placeholder="your name" />
        </FormGroup>

        <FormGroup
          label="Github Name"
          labelFor="github-input"
          labelInfo="(required"
        >
          <InputGroup id="github-input" placeholder="please your github name" />
        </FormGroup>

        <FormGroup
          label="Slack Name"
          labelFor="slack-input"
          labelInfo="(required"
        >
          <InputGroup id="slack-input" placeholder="please your slack name" />
        </FormGroup>

        <Button icon="refresh" onClick={this.submitAccountForm} text="submit" />
      </div>
    );
  }
}

class App extends React.PureComponent {
  render() {
    return <AccountFormGroup />;
  }
}

ReactDOM.render(<App />, document.querySelector("#root"));
