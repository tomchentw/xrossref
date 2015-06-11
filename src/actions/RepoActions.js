const debug = require("debug")("RepoActions");
import {default as Rx} from "rx";
import {FuncSubject} from "rx-react";

import {default as RepoConstants} from "../constants/RepoConstants";

function asJson (res) {
  return res.json();
}

function getRepoInfo (rawOwnerRepoStr) {
  const ownerRepoStr = rawOwnerRepoStr.trim();
  const repoInfoPms = fetch(
    `https://api.github.com/repos/${ ownerRepoStr }`
  )
    .then(asJson);

  const openIssuesCountPms = fetch(
    `https://api.github.com/search/issues?q=repo:${ ownerRepoStr }+state:open+is:issue`
  )
    .then(asJson)
    .then(data => data.total_count);


  const closedIssuesCountPms = fetch(
    `https://api.github.com/search/issues?q=repo:${ ownerRepoStr }+state:closed+is:issue`
  )
    .then(asJson)
    .then(data => data.total_count);

  const openPRsCountPms = fetch(
    `https://api.github.com/search/issues?q=repo:${ ownerRepoStr }+state:open+is:pr`
  )
    .then(asJson)
    .then(data => data.total_count);


  const closedPRsCountPms = fetch(
    `https://api.github.com/search/issues?q=repo:${ ownerRepoStr }+state:closed+is:pr`
  )
    .then(asJson)
    .then(data => data.total_count);

  return Promise.all([
    repoInfoPms,
    openIssuesCountPms,
    closedIssuesCountPms,
    openPRsCountPms,
    closedPRsCountPms,
  ]).spread((repo, openIssuesCount, closedIssuesCount, openPRsCount, closedPRsCount) => {
    repo.openIssuesCount = openIssuesCount;
    repo.closedIssuesCount = closedIssuesCount;
    repo.openPRsCount = openPRsCount;
    repo.closedPRsCount = closedPRsCount;
    return repo;
  });
}

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
        terms.split(",").map(getRepoInfo)
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
