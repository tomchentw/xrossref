import * as RepoActions from "../actions/RepoActions";
import {default as RepoStore} from "../stores/RepoStore";

export default function createStores () {
  const repoStore = new RepoStore();

  RepoActions.register(repoStore.update);

  return {
    repoStore,
  };
}
