const Debug = require("debug");
const debug = Debug("client");

import {default as React} from "react";
import {default as injectTapEventPlugin} from "react-tap-event-plugin";

import {default as ReactRootContainer} from "./containers/ReactRootContainer";
import {default as createStores} from "./createStores";

//Needed for onTouchTap
//Can go away when react 1.0 release
//Check this repo:
//https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

React.render((
  <ReactRootContainer {...createStores()} />
),
  document.getElementById("react-container")
);

Debug.enable("RepoActions,RepoStore,ReactRootContainer,createStores");
