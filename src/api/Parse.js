export function issuesCountsInfo (ownerRepoStr) {
  return Parse.Cloud.run("issuesCountsInfo", {
    ownerRepoStr,
  });
}

export function PRsCountsInfo (ownerRepoStr) {
  return Parse.Cloud.run("PRsCountsInfo", {
    ownerRepoStr,
  });
}
