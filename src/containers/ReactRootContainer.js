import {default as React, PropTypes} from "react";
import {default as ga, Initializer as GAInitiailizer} from "react-google-analytics";
import {default as GitHubForkRibbon} from "react-github-fork-ribbon";

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
      ga("send", "pageview", {
        "page": `${ location.pathname }${ location.search }${ location.hash }`,
      });
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
        <GAInitiailizer />
        <GitHubForkRibbon
          position="right"
          color="black"
          href="https://github.com/tomchentw/xrossref">
          Fork me on GitHub
        </GitHubForkRibbon>
        <SearchFieldContainer />
        <ReposTableContainer />
      </ReactRoot>
    );
  }
}

export default ReactRootContainer;
