function asJson (res) {
  return res.json();
}

const API_KEY = `b4d0a97c118372aef4d4f63afb686ca6`;

export function issuesCountsInfo (ownerRepoStr) {
  const [owner, repo] = ownerRepoStr.split("/");

  return fetch(
    `https://www.kimonolabs.com/api/ondemand/9a3om980?apikey=${ API_KEY
    }&kimmodify=1&kimpath1=${ owner }&kimpath2=${ repo }`
  )
    .then(asJson)
    .then(data => data.results);
}
