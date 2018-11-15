import * as React from "react";
import * as ReactRouterDom from "react-router-dom";

import { HomeIndex, AccountFormGroup, TeamFormGroup, TeamEdit } from ".";

import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import "@blueprintjs/core/lib/css/blueprint.css";

export class Application extends React.PureComponent {
  public render() {
    return (
      <ReactRouterDom.HashRouter>
        <div>
          <ReactRouterDom.Route path="/" component={HomeIndex} />
          <ReactRouterDom.Route
            path="/account/new"
            component={AccountFormGroup}
          />
          <ReactRouterDom.Route path="/team/new" component={TeamFormGroup} />
          <ReactRouterDom.Route path="/team/edit" component={TeamEdit} />
        </div>
      </ReactRouterDom.HashRouter>
    );
  }
}
