var UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/43.0.2357.124 Safari/537.36";

function repoInfo (ownerRepoStr) {
  return Parse.Cloud.httpRequest({
    url: "https://api.github.com/repos/" + ownerRepoStr,
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      "User-Agent": UA,
    },
  }).then(function(httpResponse) {
    return JSON.parse(httpResponse.text);
  });
}

Parse.Cloud.define("GitHubRepoInfo", function(request, response) {
  var ownerRepoStr = request.params.ownerRepoStr;
  repoInfo(ownerRepoStr).then(response.success, response.error);
});
