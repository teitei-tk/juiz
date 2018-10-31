import * as React from "react";
import * as ReactRouterDom from "react-router-dom";

import { HomeIndex, AccountFormGroup, TeamFormGroup } from ".";

export class Application extends React.PureComponent {
  public render() {
    return (
      <ReactRouterDom.BrowserRouter>
        <div>
          <ReactRouterDom.Route path="/" component={HomeIndex} />
          <ReactRouterDom.Route
            path="/account/new"
            component={AccountFormGroup}
          />
          <ReactRouterDom.Route path="/team/new" component={TeamFormGroup} />
        </div>
      </ReactRouterDom.BrowserRouter>
    );
  }
}
