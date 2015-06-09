const debug = require("debug")("ReactRootContainer");
import {default as React, PropTypes} from "react";
import {Styles, AppBar, TextField} from "material-ui";
const {ThemeManager, Colors} = Styles;

import {default as ReactRoot} from "../components/ReactRoot";

import {default as createStores} from "../createStores";
import * as RepoActions from "../actions/RepoActions";

class ReactRootContainer extends React.Component {

  constructor(...args) {
    super(...args);
    this.themeManager = new ThemeManager();
    this.childContext = createStores();
    this.childContext.muiTheme = this.themeManager.getCurrentTheme();
  }

  static get childContextTypes () {
    return {
      muiTheme: PropTypes.object,
      repoStore: PropTypes.object,
    };
  }

  getChildContext () {
    return this.childContext;
  }

  componentWillMount () {
    this.themeManager.setPalette({
      accent1Color: Colors.deepOrange500
    });
    this.childContext.repoStore.repos.subscribe((repos) => {
      this.setState({
        repos,
      });
    });
  }

  render () {
    const {props, state} = this;

    return (
      <ReactRoot
        onSearchEnterKeyDown={RepoActions.searchAll}
        repos={state.repos}
      />
    );
  }
}

export default ReactRootContainer;
