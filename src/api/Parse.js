/*global Parse*/

export function issuesCountsInfo (ownerRepoStr) {
  return Parse.Cloud.run("issuesCountsInfo", {
    ownerRepoStr,
  });
}

export function pullRequestsCountsInfo (ownerRepoStr) {
  return Parse.Cloud.run("PRsCountsInfo", {
    ownerRepoStr,
  });
}
