const debug = require("debug")("RepoActions");
import {FuncSubject} from "rx-react";
import {default as fetch} from "isomorphic-fetch";

import {default as RepoConstants} from "../constants/RepoConstants";

export const searchAll = FuncSubject.create();

/**
 * Register our actions against an updates stream
 * each one of our actions will push operation to apply on the model
 * into the stream.
 */
export function register (updates) {
  searchAll.flatMap((terms="") => {
    return Rx.Observable.from(terms.split(",")).flatMap((ownerRepoStr) => {
      return fetch(`https://api.github.com/repos/${ ownerRepoStr.trim() }`)
        .then(res => res.json())
        .then(data => {
          return {
            action: RepoConstants.searchAll,
            payload: data,
          };
        });
    });
  })
    .subscribe(updates);
}
