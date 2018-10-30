import * as path from "path";
import express from "express";

import { IAccountRegisterPayload } from "./interfaces/request";
import { IAccountRegisterResponse } from "./interfaces/response";

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, "./../build")));

app.post("/account/new", (req, res) => {
  const payload: IAccountRegisterPayload = JSON.parse(req.body);

  const responseData: IAccountRegisterResponse = {
    data: {
      result: true
    }
  };

  res.send(responseData);
});

app.listen(port, () => {
  console.log(`
    Listening at http://0.0.0.0:${port}/
  `);
});
