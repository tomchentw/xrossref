const debug = require("debug")("createStores");
import {default as Rx} from "rx";

import * as RepoActions from "./actions/RepoActions";
import * as RouteActions from "./actions/RouteActions";
import {default as RepoStore} from "./stores/RepoStore";
import {default as RouteStore} from "./stores/RouteStore";

const CURRENT_URL = (
  "undefined" !== typeof window && location.hash ? location.hash.substr(1) : "ZmFjZWJvb2svcmVhY3QsIGFuZ3VsYXIvYW5ndWxhci5qcw=="
);

export default function createStores () {
  const updates = new Rx.Subject();

  RepoActions.register(updates);
  RouteActions.register(updates);

  const storesMap = {};

  storesMap.repoStore = new RepoStore(updates, storesMap);
  storesMap.routeStore = new RouteStore(updates, storesMap, CURRENT_URL);

  return storesMap;
}
