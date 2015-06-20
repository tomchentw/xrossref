import {default as React, PropTypes} from "react";
import {default as Rx} from "rx";
import {Styles} from "material-ui";
const {ThemeManager, Colors} = Styles;

import {default as RepoActions} from "./actions/RepoActions";
import {default as RouteActions} from "./actions/RouteActions";
import {default as RepoStore} from "./stores/RepoStore";
import {default as RouteStore} from "./stores/RouteStore";

import {default as ReactRootContainer} from "./containers/ReactRootContainer";

const CURRENT_URL = (
  "undefined" !== typeof window && location.hash ? location.hash.substr(1) : "ZmFjZWJvb2svcmVhY3QsIGFuZ3VsYXIvYW5ndWxhci5qcw=="
);

export default class Flux extends React.Component {

  createFluxContext () {
    const fluxContext = this.fluxContext = {};
    const updates = new Rx.Subject();

    fluxContext.repoActions = new RepoActions(updates);
    fluxContext.routeActions = new RouteActions(updates);

    fluxContext.repoStore = new RepoStore(updates, fluxContext);
    fluxContext.routeStore = new RouteStore(updates, fluxContext, CURRENT_URL);

    this.subscriptions = Object.keys(fluxContext).map(key =>
      fluxContext[key].register()
    );
  }

  static get fluxContextTypes () {
    return {
      repoActions: PropTypes.object,
      routeActions: PropTypes.object,

      repoStore: PropTypes.object,
      routeStore: PropTypes.object,
    };
  }

  constructor(...args) {
    super(...args);
  }

  static get childContextTypes () {
    return {
      ...this.fluxContextTypes,
      muiTheme: PropTypes.object,
    };
  }

  getChildContext () {
    return {
      ...this.fluxContext,
      muiTheme: this.themeManager.getCurrentTheme(),
    };
  }

  componentWillMount () {
    this.createFluxContext();
    this.themeManager = new ThemeManager();
    this.themeManager.setPalette({
      accent1Color: Colors.deepOrange500
    });
  }

  componentWillUnmount () {
    this.subscriptions.forEach(subscription =>
      subscription.dispose()
    );
  }

  render () {
    return (
      <ReactRootContainer />
    );
  }
}
