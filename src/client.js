const Debug = require("debug");
const debug = Debug("client");

import {default as React} from "react";
import {default as injectTapEventPlugin} from "react-tap-event-plugin";

import {default as Flux} from "./Flux";

//Needed for onTouchTap
//Can go away when react 1.0 release
//Check this repo:
//https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

React.render((
  <Flux />
),
  document.getElementById("react-container")
);

Debug.enable("ReposTable,ReactRootContainer");
