import * as React from "react";
import * as ReactDOM from "react-dom";

export * from "./client";

import { App } from "./client";

ReactDOM.render(<App />, document.querySelector("#root"));
