const debug = require("debug")("ReactRootContainer");
import {default as React, PropTypes} from "react";
import {Styles} from "material-ui";
const {ThemeManager, Colors} = Styles;

import {default as ReactRoot} from "../components/ReactRoot";
import {default as ReposTableContainer} from "./ReposTableContainer";
import {default as SearchFieldContainer} from "./SearchFieldContainer";

import {default as createStores} from "../createStores";

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
      routeStore: PropTypes.object,
    };
  }

  getChildContext () {
    return this.childContext;
  }

  componentWillMount () {
    this.themeManager.setPalette({
      accent1Color: Colors.deepOrange500
    });
    this.childContext.routeStore.currentUrl.subscribe((url) => {
      location.hash = url;
    });
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
