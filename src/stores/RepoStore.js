import {default as Rx} from "rx";

import {default as RepoConstants} from "../constants/RepoConstants";

export default class RepoStore {
  // our store expose 2 streams :
  // `updates`: that should receive actions to be applied on our list of repos
  // `repos`: an observable that will contains our up to date list of repos
  constructor (updates, storesMap) {
    this.updates = updates;
    this.storesMap = storesMap;
    this.repos =  new Rx.BehaviorSubject([]);
  }

  register () {
    return Rx.Observable.merge(...[
      this.handleSearchAllSuccess(),
      this.hanlleRemoveOne(),
    ])
      .subscribe(this.repos);
  }

  handleSearchAllSuccess () {
    return this.updates
      .filter(({action}) => RepoConstants.searchAllSuccess === action)
      .flatMap(({payload}) => {
        return this.repos.take(1).map(repos => {
          return payload;
        });
      });
  }

  hanlleRemoveOne () {
    return this.updates
      .filter(({action}) => RepoConstants.removeOne === action)
      .flatMap(({payload: {id}}) => {
        return this.repos.take(1).map(repos => {
          for (let i = 0; i < repos.length; i++) {
            if (id === repos[i].id) {
              repos.splice(i, 1);
              return repos;
            }
          }
          return repos;
        });
      });
  }
}
