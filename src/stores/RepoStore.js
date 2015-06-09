const debug = require("debug")("RepoStore");
import {default as Rx} from "rx";

import {default as RepoConstants} from "../constants/RepoConstants";

export default class RepoStore {
  // our store expose 2 streams :
  // `updates`: that should receive actions to be applied on our list of repos
  // `repos`: an observable that will contains our up to date list of repos
  constructor() {
    this.updates = new Rx.Subject();
    this.repos =  new Rx.BehaviorSubject([]);

    Rx.Observable.merge(
      this.handleSearchAll()
    )
      .subscribe(this.repos);
  }

  handleSearchAll () {
    return this.updates
      .filter(({action}) => RepoConstants.searchAll === action)
      .flatMap(({payload}) => {
        return this.repos.take(1).map((repos) => {
          return payload;
        });
      });
  }
}
