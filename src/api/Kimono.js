function asJson (res) {
  return res.json();
}

const API_KEY = `b4d0a97c118372aef4d4f63afb686ca6`;

let last = Promise.resolve();

function oneRequestAtATime (...argsForFetch) {
  return last = last.then(_ => fetch(...argsForFetch));
}

export function issuesCountsInfo (ownerRepoStr) {
  const [owner, repo] = ownerRepoStr.split("/");

  return oneRequestAtATime(
    `https://www.kimonolabs.com/api/ondemand/9a3om980?apikey=${ API_KEY
    }&kimmodify=1&kimpath1=${ owner }&kimpath2=${ repo }`
  )
    .then(asJson)
    .then(data => data.results);
}
