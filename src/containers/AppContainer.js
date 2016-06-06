import {
  parse as parseUrl,
} from "url";

import {
  Observable,
} from "rx";

import {
  List,
} from "immutable";

import {
  default as React,
  Component,
  PropTypes,
} from "react";

import {
  default as ThemeManager,
} from 'material-ui/lib/styles/theme-manager';

import {
  default as LightRawTheme,
} from 'material-ui/lib/styles/raw-themes/light-raw-theme';

import {
  default as ga,
  Initializer as GAInitiailizer,
} from "react-google-analytics";

import {
  default as GitHubForkRibbon,
} from "react-github-fork-ribbon";

import {
  default as App,
} from "../components/App";

import {
  default as ReposTableContainer,
} from "./ReposTableContainer";

import {
  default as SearchFieldContainer,
} from "./SearchFieldContainer";

export default class AppContainer extends Component {

  static contextTypes = {
    repoActions: PropTypes.object,
    repoStore: PropTypes.object,
    routeActions: PropTypes.object,
    routeStore: PropTypes.object,
  };

  static childContextTypes = {
    muiTheme: React.PropTypes.object,
  };

  state = {
    topPaths: new List(),
  };

  getChildContext() {
    return {
      muiTheme: ThemeManager.getMuiTheme(LightRawTheme),
    };
  }

  componentDidMount() {
    const {
      currentHash,
      topPaths: topPathsObserverable,
    } = this.context.routeStore;

    currentHash
      .subscribe((hash) => {
        location.hash = hash;

        ga(`send`, `pageview`, {
          page: location.hash,
        });
      });

    Observable.fromEvent(window, `hashchange`, event => (
      parseUrl(event.newURL).hash.substr(1)
    ))
      .merge(currentHash.take(1))
      .map(atob)
      .subscribe(this.context.repoActions.searchAll);

    topPathsObserverable.subscribe((topPaths) => {
      this.setState({ topPaths });
    });

    this.context.routeActions.loadTopPaths();
  }

  render() {
    const { state } = this;

    return (
      <App
        onHashChange={this.context.routeActions.changeHash}
        topPaths={state.topPaths}
      >
        <GAInitiailizer />
        <GitHubForkRibbon
          position="right"
          color="black"
          href="https://github.com/tomchentw/xrossref"
        >
          Fork me on GitHub
        </GitHubForkRibbon>
        <SearchFieldContainer />
        <ReposTableContainer />
      </App>
    );
  }
}
