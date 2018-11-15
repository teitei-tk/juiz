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
        <UL>
          <li>
            <Link to="/account/new">New Account</Link>
          </li>
        </UL>
        <UL>
          <li>
            <Link to="/team/list">All Teams</Link>
          </li>
          <li>
            <Link to="/team/new">New Team</Link>
          </li>
          <li>
            <Link to="/team/edit">Team Edit</Link>
          </li>
        </UL>
      </UL>
    );
  }
}
