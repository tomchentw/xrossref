const debug = require("debug")("Flux");
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
    const childContext = {};
    const updates = new Rx.Subject();

    childContext.repoActions = new RepoActions(updates);
    childContext.routeActions = new RouteActions(updates);

    childContext.repoStore = new RepoStore(updates, childContext);
    childContext.routeStore = new RouteStore(updates, childContext, CURRENT_URL);

    Object.keys(childContext).forEach(key => childContext[key].register());
    return childContext;
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
    this.themeManager = new ThemeManager();

    this.fluxContext = this.createFluxContext();
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
    this.themeManager.setPalette({
      accent1Color: Colors.deepOrange500
    });
  }

  render () {
    return (
      <ReactRootContainer />
    );
  }
}
