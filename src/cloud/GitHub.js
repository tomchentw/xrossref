/*global Parse*/

import {parseTextIntoNum} from "./textUtils";
import {default as fetchPage} from "./fetchPage";

const openIssuesCountRegExp = /<span class\=\"octicon octicon-issue-opened\"><\/span>\s+(\S+) Open/;
const closedIssuesCountRegExp = /<span class\=\"octicon octicon-check\"><\/span>\s+(\S+) Closed/;

const openPRsCountRegExp = /<span class\=\"octicon octicon-git-pull-request\"><\/span>\s+(\S+) Open/;
const closedPRsCountRegExp = /<span class\=\"octicon octicon-check\"><\/span>\s+(\S+) Closed/;

Parse.Cloud.define("issuesCountsInfo", function({params: {ownerRepoStr}}, response) {
  fetchPage({
    url: `https://github.com/${ ownerRepoStr }/issues`,
  })
    .then(function({text}) {
      return {
        openIssuesCount: parseTextIntoNum(text, openIssuesCountRegExp),
        closedIssuesCount: parseTextIntoNum(text, closedIssuesCountRegExp),
      };
    })
    .then(response.success, response.error);
});

Parse.Cloud.define("PRsCountsInfo", function({params: {ownerRepoStr}}, response) {
  fetchPage({
    url: `https://github.com/${ ownerRepoStr }/pulls`,
  })
    .then(function({text}) {
      return {
        openPRsCount: parseTextIntoNum(text, openPRsCountRegExp),
        closedPRsCount: parseTextIntoNum(text, closedPRsCountRegExp),
      };
    })
    .then(response.success, response.error);
});
