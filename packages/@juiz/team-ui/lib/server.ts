import * as path from "path";

import express from "express";

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, "./../build")));

app.listen(port, () => {
  console.log(`Listening at http://0.0.0.0:${port}/`);
});
