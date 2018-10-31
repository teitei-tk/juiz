import * as React from "react";
import { Link } from "react-router-dom";
import { UL } from "@blueprintjs/core";

export class HomeIndex extends React.PureComponent {
  public render() {
    return (
      <UL>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/account/new">AccountNew</Link>
        </li>
        <li>
          <Link to="/team/new">TeamNew</Link>
        </li>
      </UL>
    );
  }
}
