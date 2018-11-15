import * as path from "path";
import express from "express";
import bodyParser from "body-parser";

import {
  IAccountRegisterPayload,
  ITeamRegisterPayload,
  IAllTeamsResponse
} from "./interfaces";

import { AccountService } from "./services";
import { TeamService } from "./services/team";

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, "./../build")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/account/list", (req, res) => {
  const responseData = {
    data: {}
  };

  res.send(responseData);
});

app.post("/account/new", (req, res) => {
  const payload: IAccountRegisterPayload = req.body;

  const service = new AccountService();
  const result = service.newAccount(payload);

  const responseData = {
    data: {
      result
    }
  };

  res.send(responseData);
});

app.get("/teams", async (_, res) => {
  const service = new TeamService();
  const teams = await service.findAllTeam();

  const teamResponse = teams.entities.map(entity => {
    return entity.toJSON();
  });

  const responseData: IAllTeamsResponse = {
    data: {
      entities: teamResponse
    }
  };

  res.send(responseData);
});

app.post("/team/new", async (req, res) => {
  const payload: ITeamRegisterPayload = req.body;

  const service = new TeamService();
  const result = await service.newTeam(payload.teamName);

  const responseData = {
    data: {
      result
    }
  };

  res.send(responseData);
});

app.listen(port, () => {
  console.log(`
    Listening at http://0.0.0.0:${port}/
  `);
});
