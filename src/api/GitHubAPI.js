function asJson (res) {
  return res.json();
}

export function repoInfo (ownerRepoStr) {
  return fetch(
    `https://api.github.com/repos/${ ownerRepoStr }`
  )
    .then(asJson);
}

export function openIssuesCount (ownerRepoStr) {
  return fetch(
    `https://api.github.com/search/issues?q=repo:${ ownerRepoStr }+state:open+is:issue`
  )
    .then(asJson)
    .then(data => data.total_count);
}

export function closedIssuesCount (ownerRepoStr) {
  return fetch(
    `https://api.github.com/search/issues?q=repo:${ ownerRepoStr }+state:closed+is:issue`
  )
    .then(asJson)
    .then(data => data.total_count);
}

export function openPRsCount (ownerRepoStr) {
  return fetch(
    `https://api.github.com/search/issues?q=repo:${ ownerRepoStr }+state:open+is:pr`
  )
    .then(asJson)
    .then(data => data.total_count);
}

export function closedPRsCount (ownerRepoStr) {
  return fetch(
    `https://api.github.com/search/issues?q=repo:${ ownerRepoStr }+state:closed+is:pr`
  )
    .then(asJson)
    .then(data => data.total_count);
}

export function lastYearCommitsCount (ownerRepoStr) {
  return fetch(
    `https://api.github.com/repos/${ ownerRepoStr }/stats/participation`
  )
    .then(asJson)
    .then(({all=[]}) => all.reduce((acc, c) => { return acc + c; }, 0));
}
