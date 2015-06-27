import {default as Rx} from "rx";

import {default as RepoConstants} from "../constants/RepoConstants";
import {default as RouteConstants} from "../constants/RouteConstants";

export default class RouteStore {
  // our store expose 2 streams :
  // `updates`: that should receive actions to be applied on our list of currentUrl
  // `currentUrl`: an observable that will contains our up to date list of currentUrl
  constructor (updates, storesMap, currentUrl) {
    this.updates = updates;
    this.storesMap = storesMap;

    this.currentUrl = new Rx.BehaviorSubject(currentUrl);
    this.topPaths = new Rx.BehaviorSubject([]);
  }

  register () {
    return Rx.Observable.merge(...[
      this.registerCurrentUrl(),
      this.registerTopPaths(),
    ]);
  }

  registerCurrentUrl () {
    return Rx.Observable.merge(...[
      this.handleSearchAll(),
      this.hanlleRemoveOne(),
      this.handleChangeUrl(),
    ])
      .subscribe(this.currentUrl);
  }

  registerTopPaths () {
    return Rx.Observable.merge(...[
      this.handleLoadTopPathsSuccess(),
    ])
      .subscribe(this.topPaths);
  }

  handleSearchAll () {
    return this.updates
      .filter(({action}) => RepoConstants.searchAll === action)
      .map(({payload: {terms}}) => terms)
      .map(btoa);
  }

  hanlleRemoveOne () {
    return this.updates
      .filter(({action}) => RepoConstants.removeOne === action)
      .flatMap(() => {
        return this.storesMap.repoStore.repos.take(1).map((repos) => {
          return repos.map(repo => repo.get("full_name")).join(", ");
        });
      })
      .map(btoa);
  }

  handleChangeUrl () {
    return this.updates
      .filter(({action}) => RouteConstants.removeOne === action)
      .map(({payload: {url}}) => {
        return url;
      });
  }

  handleLoadTopPathsSuccess () {
    return this.updates
      .filter(({action}) => RouteConstants.loadTopPathsSuccess === action)
      .map(({payload: {topPaths}}) => {
        return topPaths;
      });
  }
}
