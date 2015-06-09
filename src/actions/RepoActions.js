const debug = require("debug")("RepoActions");
import {default as Rx} from "rx";
import {FuncSubject} from "rx-react";
import {default as fetch} from "isomorphic-fetch";

import {default as RepoConstants} from "../constants/RepoConstants";

export const searchAll = FuncSubject.create();
export const removeOne = FuncSubject.create();

function applySearchAll () {
  return searchAll.flatMap((terms="") => {
    return Promise.all(
      terms.split(",").map(ownerRepoStr => {
        return fetch(`https://api.github.com/repos/${ ownerRepoStr.trim() }`)
          .then(res => res.json());
      })
    ).then(repos => {
      return {
        action: RepoConstants.searchAll,
        payload: repos,
      };
    });
  })
}

function applyRemoveOne () {
  return removeOne.map((id) => {
    return {
      action: RepoConstants.removeOne,
      payload: {id},
    };
  })
}

/**
 * Register our actions against an updates stream
 * each one of our actions will push operation to apply on the model
 * into the stream.
 */
export function register (updates) {
  Rx.Observable.merge(...[
    applySearchAll(),
    applyRemoveOne(),
  ])
    .subscribe(updates);
}
