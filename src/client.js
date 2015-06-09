import {default as React} from "react";
import {default as injectTapEventPlugin} from "react-tap-event-plugin";

import {default as ReactRoot} from "./components/ReactRoot";

//Needed for onTouchTap
//Can go away when react 1.0 release
//Check this repo:
//https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

React.render(<ReactRoot />, document.getElementById("react-container"));
