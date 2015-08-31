/*global Parse*/
const Debug = require("debug");

import {default as React} from "react";
import {default as ga} from "react-google-analytics";
import {default as injectTapEventPlugin} from "react-tap-event-plugin";

import {default as ReactRoot} from "./ReactRoot";

ga("create", process.env.GOOGLE_ANALYTICS_TRACK_NUMBER, "auto");

//Needed for onTouchTap
//Can go away when react 1.0 release
//Check this repo:
//https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

Parse.initialize("DZVj6JFa1zjlLZBEkShSxWKDYtbeShS0PHLeZ0Sk", "gc4hhkwulJfCaT8Ti1gJJIfI42yD1RYobdmbqly8");

React.render((
  <ReactRoot />
),
  document.getElementById("react-container")
);

Debug.enable("ReposTable,AppContainer");
