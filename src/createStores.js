const debug = require("debug")("createStores");
import * as RepoActions from "./actions/RepoActions";
import * as RouteActions from "./actions/RouteActions";
import {default as RepoStore} from "./stores/RepoStore";
import {default as RouteStore} from "./stores/RouteStore";

export default function createStores () {
  const repoStore = new RepoStore();
  const routeStore = new RouteStore();

  RepoActions.register(repoStore.updates);
  RouteActions.register(routeStore.updates);

  return {
    repoStore,
    routeStore,
  };
}
