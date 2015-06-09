const debug = require("debug")("createStores");
import * as RepoActions from "./actions/RepoActions";
import {default as RepoStore} from "./stores/RepoStore";

export default function createStores () {
  const repoStore = new RepoStore();

  RepoActions.register(repoStore.updates);

  return {
    repoStore,
  };
}
