import {default as React, PropTypes} from "react";

import {default as ReactRoot} from "../components/ReactRoot";
import {default as ReposTableContainer} from "./ReposTableContainer";
import {default as SearchFieldContainer} from "./SearchFieldContainer";

class ReactRootContainer extends React.Component {

  static get contextTypes () {
    return {
      repoActions: PropTypes.object,
      repoStore: PropTypes.object,
      routeStore: PropTypes.object,
      muiTheme: PropTypes.object,
    };
  }

  constructor(...args) {
    super(...args);
  }

  componentDidMount () {
    const {currentUrl} = this.context.routeStore;
    currentUrl.subscribe((url) => {
      location.hash = url;
    });
    currentUrl
      .take(1)
      .map(atob)
      .subscribe(this.context.repoActions.searchAll);
  }

  render () {
    const {props, state} = this;

    return (
      <ReactRoot>
        <SearchFieldContainer />
        <ReposTableContainer />
      </ReactRoot>
    );
  }
}

export default ReactRootContainer;
