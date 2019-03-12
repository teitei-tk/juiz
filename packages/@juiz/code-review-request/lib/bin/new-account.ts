import { Questions } from "inquirer";
import inquirer = require("inquirer");

import { newAccount, newAccounts } from "./../account";

const questions: Questions = [
  {
    type: "input",
    name: "slackName",
    message: "please your Slack name"
  },
  {
    type: "input",
    name: "githubName",
    message: "please your GitHub name"
  }
];

inquirer
  .prompt(questions)
  .then((r: { slackName: string; githubName: string }) => {
    const accounts: newAccounts = [
      {
        name: r.githubName,
        type: "github"
      },
      {
        name: r.slackName,
        type: "slack"
      }
    ];

    const account = newAccount(r.githubName, accounts);
    console.log(account);
    return account.toJSON();
  });
