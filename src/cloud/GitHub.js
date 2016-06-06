/* global Parse */

import {
  parseTextIntoNum,
} from "./textUtils";

import {
  default as fetchPage,
} from "./fetchPage";

/* eslint-disable max-len */
const openIssuesCountRegExp = /<span class="octicon octicon-issue-opened"><\/span>\s+(\S+) Open/;
const closedIssuesCountRegExp = /<span class="octicon octicon-check"><\/span>\s+(\S+) Closed/;

const openPRsCountRegExp = /<span class="octicon octicon-git-pull-request"><\/span>\s+(\S+) Open/;
const closedPRsCountRegExp = /<span class="octicon octicon-check"><\/span>\s+(\S+) Closed/;
/* eslint-enable max-len */

Parse.Cloud.define(`issuesCountsInfo`, (
  { params: { ownerRepoStr } }, response
) => {
  fetchPage({
    url: `https://github.com/${ownerRepoStr}/issues`,
  })
    .then(({ text }) => ({
      openIssuesCount: parseTextIntoNum(text, openIssuesCountRegExp),
      closedIssuesCount: parseTextIntoNum(text, closedIssuesCountRegExp),
    }))
    .then(response.success, response.error);
});

Parse.Cloud.define(`PRsCountsInfo`, (
  { params: { ownerRepoStr } }, response
) => {
  fetchPage({
    url: `https://github.com/${ownerRepoStr}/pulls`,
  })
    .then(({ text }) => ({
      openPRsCount: parseTextIntoNum(text, openPRsCountRegExp),
      closedPRsCount: parseTextIntoNum(text, closedPRsCountRegExp),
    }))
    .then(response.success, response.error);
});
