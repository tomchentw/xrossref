const debug = require("debug")("RepoStore");
import {default as Rx} from "rx";

import {default as RepoConstants} from "../constants/RepoConstants";

export default class RepoStore {
  // our store expose 2 streams :
  // `updates`: that should receive operations to be applied on our list of todo
  // `repos`: an observable that will contains our up to date list of todo
  constructor() {
    this.updates = new Rx.BehaviorSubject([]);

    this.repos = Rx.Observable.merge(
      this.applySearchAll(),
    );
  }

  applySearchAll () {
    return this.updates
      .filter(({action}) => RepoConstants.searchAll === action)
      .scan([], (repos, {payload}) => {
        return repos.concat(payload);
      });
  }
}
