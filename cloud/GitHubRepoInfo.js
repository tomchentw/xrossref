var UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/43.0.2357.124 Safari/537.36";

function textToNumber (text) {
  return parseInt(
    text.replace(",", "")
  , 10);
}

function issuesCountsInfo (ownerRepoStr) {
  return Parse.Cloud.httpRequest({
    url: "https://github.com/" + ownerRepoStr + "/issues",
    headers: {
      "Content-Type": "text/html;charset=utf-8",
      "User-Agent": UA,
    },
  }).then(function(httpResponse) {
    var text = httpResponse.text;

    var openIssuesCountRegExp = /<span class\=\"octicon octicon-issue-opened\"><\/span>\s+(\S+) Open/;
    var openIssuesCount = textToNumber(text.match(openIssuesCountRegExp)[1]);


    var closedIssuesCountRegExp = /<span class\=\"octicon octicon-check\"><\/span>\s+(\S+) Closed/;
    var closedIssuesCount = textToNumber(text.match(closedIssuesCountRegExp)[1]);

    return {
      openIssuesCount: openIssuesCount,
      closedIssuesCount: closedIssuesCount,
    };
  });
}

function PRsCountsInfo (ownerRepoStr) {
  return Parse.Cloud.httpRequest({
    url: "https://github.com/" + ownerRepoStr + "/pulls",
    headers: {
      "Content-Type": "text/html;charset=utf-8",
      "User-Agent": UA,
    },
  }).then(function(httpResponse) {
    var text = httpResponse.text;

    var openPRsCountRegExp = /<span class\=\"octicon octicon-git-pull-request\"><\/span>\s+(\S+) Open/;
    var openPRsCount = textToNumber(text.match(openPRsCountRegExp)[1]);


    var closedPRsCountRegExp = /<span class\=\"octicon octicon-check\"><\/span>\s+(\S+) Closed/;
    var closedPRsCount = textToNumber(text.match(closedPRsCountRegExp)[1]);

    return {
      openPRsCount: openPRsCount,
      closedPRsCount: closedPRsCount,
    };
  });
}

Parse.Cloud.define("issuesCountsInfo", function(request, response) {
  var ownerRepoStr = request.params.ownerRepoStr;
  issuesCountsInfo(ownerRepoStr).then(response.success, response.error);
});


Parse.Cloud.define("PRsCountsInfo", function(request, response) {
  var ownerRepoStr = request.params.ownerRepoStr;
  PRsCountsInfo(ownerRepoStr).then(response.success, response.error);
});
