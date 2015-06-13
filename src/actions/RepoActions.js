const debug = require("debug")("RepoActions");
import {default as Immutable} from "immutable";
import {default as Rx} from "rx";
import {FuncSubject} from "rx-react";
import {default as moment} from "moment";

import * as GitHub from "../api/GitHub";
import * as Kimono from "../api/Kimono";
import {default as RepoConstants} from "../constants/RepoConstants";

function getRepoInfo (rawOwnerRepoStr) {
  const ownerRepoStr = rawOwnerRepoStr.trim();

  const repoInfo = GitHub.repoInfo(ownerRepoStr);
  const lastYearCommitsCount = GitHub.lastYearCommitsCount(ownerRepoStr);

  const issuesCountsInfo = Kimono.issuesCountsInfo(ownerRepoStr);
  const openIssuesCount = issuesCountsInfo.then(data => data.openItemsCount);
  const closedIssuesCount = issuesCountsInfo.then(data => data.closedItemsCount);

  const prsCountsInfo = Kimono.PRsCountsInfo(ownerRepoStr);
  const openPRsCount = prsCountsInfo.then(data => data.openItemsCount);
  const closedPRsCount = prsCountsInfo.then(data => data.closedItemsCount);

  return Promise.props({
    repoInfo,
    openIssuesCount,
    closedIssuesCount,
    openPRsCount,
    closedPRsCount,
    lastYearCommitsCount,
  }).then((promisesMap) => {
    return Immutable.fromJS(promisesMap).withMutations(map => {
      const repoInfo = map.get("repoInfo")
        .groupBy((value, key) => /ed_at/.test(key))
        .reduce((acc, map, isMoment) => {
          return acc.merge(
            isMoment ? map.map(value => moment(value)) : map
          );
        }, Immutable.Map());
      const diffOfLastPushDays = repoInfo.get("pushed_at")
        .diff(moment(), "days");

      map.delete("repoInfo")
        .merge(repoInfo)
        .set("daysSinceLastCommit", Math.abs(diffOfLastPushDays));
    });
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
      return Rx.Observable.from(terms.split(","))
        .flatMap((rawOwnerRepoStr, index) => {
          return getRepoInfo(rawOwnerRepoStr).then((repoInfo) => {
            return {
              repoInfo,
              index,
            };
          });
        })
        .scan(Immutable.List(), (list, {repoInfo, index}) => {
          return list.set(index, repoInfo);
        })
        .map((repos) => {
          return {
            action: RepoConstants.searchAllSuccess,
            payload: repos,
          };
        })
        .startWith({
          action: RepoConstants.searchAll,
          payload: {terms},
        });
    });
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
