import {
  default as React,
  Component,
  PropTypes,
} from "react";

import {
  default as Rx,
} from "rx";

import {
  default as RepoActions,
} from "./actions/RepoActions";

import {
  default as RouteActions,
} from "./actions/RouteActions";

import {
  default as RepoStore,
} from "./stores/RepoStore";

import {
  default as RouteStore,
} from "./stores/RouteStore";

import {
  default as AppContainer,
} from "./containers/AppContainer";

const CURRENT_HASH = (
  typeof window !== `undefined` && location.hash ?
  location.hash.substr(1) :
  `ZmFjZWJvb2svcmVhY3QsIGFuZ3VsYXIvYW5ndWxhci5qcw==`
);

const fluxContextTypes = {
  repoActions: PropTypes.object,
  routeActions: PropTypes.object,

  repoStore: PropTypes.object,
  routeStore: PropTypes.object,
};

export default class ReactRoot extends Component {

  static childContextTypes = {
    ...fluxContextTypes,
  };

  getChildContext() {
    return {
      ...this.fluxContext,
    };
  }

  componentWillMount() {
    this.createFluxContext();
  }

  componentWillUnmount() {
    this.subscriptions.forEach(subscription =>
      subscription.dispose()
    );
  }

  static fluxContextTypes = fluxContextTypes;

  createFluxContext() {
    const fluxContext = this.fluxContext = {};
    const updates = new Rx.Subject();

    fluxContext.repoActions = new RepoActions(updates);
    fluxContext.routeActions = new RouteActions(updates);

    fluxContext.repoStore = new RepoStore(updates, fluxContext);
    fluxContext.routeStore = new RouteStore(updates, fluxContext, CURRENT_HASH);

    this.subscriptions = Object.keys(fluxContext).map(key =>
      fluxContext[key].register()
    );
  }

  render() {
    return (
      <AppContainer />
    );
  }
}
