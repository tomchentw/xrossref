import {parse as parseUrl} from "url";
import {default as Rx} from "rx";
import {FuncSubject} from "rx-react";
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
      routeActions: PropTypes.object,
      routeStore: PropTypes.object,
      muiTheme: PropTypes.object,
    };
  }

  constructor(...args) {
    super(...args);
    this.state = {
      topPaths: [],
    };
    this.handleHashChange = FuncSubject.create();
  }

  componentDidMount () {
    const {
      currentHash,
      topPaths: topPathsObserverable,
    } = this.context.routeStore;

    this.handleHashChange
      .merge(currentHash)
      .subscribe((hash) => {
        location.hash = hash;

        ga("send", "pageview", {
          "page": location.hash,
        });
      });

    Rx.Observable.fromEvent(window, "hashchange", args => {
        return parseUrl(args[0].newURL).hash.substr(1);
      })
      .merge(currentHash.take(1))
      .map(atob)
      .subscribe(this.context.repoActions.searchAll);

    topPathsObserverable.subscribe((topPaths) => {
      this.setState({topPaths});
    });

    this.context.routeActions.loadTopPaths();
  }

  render () {
    const {props, state} = this;

    return (
      <ReactRoot
        onHashChange={this.handleHashChange}
        topPaths={state.topPaths}>
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
