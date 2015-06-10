const debug = require("debug")("RepoActions");
import {default as Rx} from "rx";
import {FuncSubject} from "rx-react";
import {default as fetch} from "isomorphic-fetch";

import {default as RepoConstants} from "../constants/RepoConstants";

export default class RepoActions {
  constructor (updates) {
    this.updates = updates;
    //
    this.searchAll = FuncSubject.create();
    this.removeOne = FuncSubject.create();
  }

  register () {
    /**
     * Register our actions against an updates stream
     * each one of our actions will push operation to apply on the model
     * into the stream.
     */
    return Rx.Observable.merge(...[
      this.applySearchAll(),
      this.applyRemoveOne(),
    ])
      .subscribe(this.updates);
  }

  applySearchAll () {
    return this.searchAll.flatMap((terms="") => {
      const searchAllPms = Promise.resolve({
        action: RepoConstants.searchAll,
        payload: {terms},
      });

      const searchAllSuccessPms = Promise.all(
        terms.split(",").map(ownerRepoStr => {
          return fetch(`https://api.github.com/repos/${ ownerRepoStr.trim() }`)
            .then(res => res.json());
        })
      ).then(repos => {
        return {
          action: RepoConstants.searchAllSuccess,
          payload: repos,
        };
      });

      return Rx.Observable.merge(...[
        Rx.Observable.fromPromise(searchAllPms),
        Rx.Observable.fromPromise(searchAllSuccessPms),
      ]);
    })
  }

  applyRemoveOne () {
    return this.removeOne.map((id) => {
      return {
        action: RepoConstants.removeOne,
        payload: {id},
      };
    })
  }
}
