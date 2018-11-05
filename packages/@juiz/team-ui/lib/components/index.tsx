import * as React from "react";
import * as ReactDOM from "react-dom";

export * from "./apiClient";
export * from "./accounts";
export * from "./homes";
export * from "./teams";
export * from "./application";

import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import "@blueprintjs/core/lib/css/blueprint.css";

import { Application } from "./application";

ReactDOM.render(<Application />, document.querySelector("#root"));
